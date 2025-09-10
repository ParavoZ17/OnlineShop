import styles from "./form.module.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onBlur", // валідація після розфокусу
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3333/sale/send", {
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
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
              maxLength: { value: 30, message: "Maximum 30 characters" },
            })}
          />
          <p className={styles.error}>{errors.name?.message || ""}</p>
        </div>

        <div className={styles.inputWrapper}>
          <input
            placeholder="Phone number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,13}$/,
                message: "Phone must contain only digits (10–13 characters)",
              },
            })}
          />
          <p className={styles.error}>{errors.phoneNumber?.message || ""}</p>
        </div>

        <div className={styles.inputWrapper}>
          <input
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message || ""}</p>
        </div>

        <input
          type="submit"
          value={isSubmitting ? "Sending..." : "Get a discount"}
          disabled={!isValid || isSubmitting}
          className={styles.submitBtn}
        />
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
