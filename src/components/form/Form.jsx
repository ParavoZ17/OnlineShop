import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {VALIDATION, BASE_URL} from '../../../constants'

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/sale/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error while sending");

      toast.success("✅ Data has been sent successfully!");
      reset();
    } catch (error) {
      toast.error("❌ An error occurred while sending");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            placeholder="Name"
            {...register("name", VALIDATION.name)}
          />
          <p className={styles.error}>{errors.name?.message || ""}</p>
        </div>

        <div className={styles.inputWrapper}>
          <input
            placeholder="Phone number"
            {...register("phoneNumber", VALIDATION.phoneNumber)}
          />
          <p className={styles.error}>{errors.phoneNumber?.message || ""}</p>
        </div>

        <div className={styles.inputWrapper}>
          <input
            placeholder="Email"
            {...register("email", VALIDATION.email)}
          />
          <p className={styles.error}>{errors.email?.message || ""}</p>
        </div>

        <input
          type="submit"
          value={
            !isValid
              ? "fill out the form"
              : isSubmitting
                ? "Sending..."
                : "Get a discount"
          }
          disabled={!isValid || isSubmitting}
          className={styles.submitBtn}
        />
      </form>
      <ToastContainer />
    </>
  );
}
