import {reactive, ref} from "vue";
import {defineStore} from "pinia";
import {useAuth} from "@/stores/auth";

export const useLogin = defineStore("login", () => {
    const auth = useAuth();
    const errors = reactive({});
    const isLoading = ref(false)
    const form = reactive({
        email: "",
        password: "",
        remember: false
    });

    function resetForm() {
        form.email = "";
        form.password = "";
        form.remember = false;
    }

    async function handleSubmit() {
        if (isLoading.value) {
            return
        }

        isLoading.value = true
        errors.value = {}
        return window.axios.post("auth/login", form).then((response) => {
            auth.login(response.data.data.access_token)

        }).catch((res) => {
            if(res.response.status == 422) {
                errors.value = res.response.data.errors
            }
        }).finally(() => {
            form.password = "";
            isLoading.value = false
        });
    }

    return { form, resetForm, handleSubmit, errors, isLoading };
});