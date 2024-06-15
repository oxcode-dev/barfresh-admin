
export default function useForm(fields) {
    let defaults = fields;
    let recentlySuccessfulTimeoutId;

    const form = reactive({
        fields: JSON.parse(JSON.stringify(fields)),
        errors: {},
        dirty: false,
        hasErrors: false,
        processing: false,
        wasSuccessful: false,
        recentlySuccessful: false,

        async submit(submitFn, hooks={}) {
            if (this.processing) return;

            const _hooks = {
                onBefore: async () => {
                    this.processing = true
                    this.wasSuccessful = false
                    this.recentlySuccessful = false
                    clearTimeout(recentlySuccessfulTimeoutId)

                    if(hooks.onBefore) {
                        await hooks.onBefore()
                    }
                },
                onSuccess: async (response) => {
                    this.clearErrors();
                    this.wasSuccessful = true
                    this.recentlySuccessful = true

                    recentlySuccessfulTimeoutId = setTimeout(() => {
                        this.recentlySuccessful = false
                    }, 2000)

                    if(hooks.onSuccess) {
                        await hooks.onSuccess()
                    }

                    defaults = JSON.parse(JSON.stringify(this.fields))
                },

                onError: async (error) => {
                    this.hasErrors = true
                    if(error?.status === 422) {
                        this.clearErrors()
                        this.setErrors(error?.data?.errors)
                    }

                    if(hooks.onError) {
                        await hooks.onError()
                    }
                },

                onFinish: async () => {
                    this.processing = false

                    if(hooks.onFinish) {
                        await hooks.onFinish()
                    }
                },
            }

            await _hooks.onBefore()

            try {
                const response = await submitFn(this.fields)
                await _hooks.onSuccess(response)
            } catch(error){
                await _hooks.onError(error)
            } finally {
                await _hooks.onFinish()
            }
        },

        reset() {
            const clonedDefaults = JSON.parse(JSON.stringify(defaults))

            if(fields.length === 0) {
                this.fields = clonedDefaults
            }
            else {
                fields.forEach((field) => {
                    if(clonedDefaults[field] !== undefined) {
                        this.fields[field] = clonedDefaults[field]
                    }
                })
            }
        },

        clearErrors(...fields) {
            if(fields.length === 0){
                this.errors = {}
            }
            else {
                fields.forEach((field) => delete this.errors[field])
            }
            this.hasErrors = Object.keys(this.errors).length > 0
        },

        setErrors(errors) {
            this.errors = {
                ...this.errors,
                ...errors,
            };

            this.hasErrors = Object.keys(this.errors).length > 0
        },
    })

    watch(
        () => form.fields,
        () => {
            // Compare the objects function
            form.dirty = !isEqual(form.fields, defaults)
        },
        { immediate: true, deep: true}
    )

    return form;
}