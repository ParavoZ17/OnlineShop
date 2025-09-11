import styles from "./orderForm.module.css";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function OrderForm() {
  const cartItems = useSelector((state) => state.basket.items);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        items: cartItems,
      };

      const response = await fetch("http://localhost:3333/order/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Error while sending");

      toast.success("✅ Order has been sent successfully!");
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
          <div className={styles.errorContainer}>
            {Object.keys(errors).length > 0 && (
              <div className={styles.formErrors}>
                {Object.values(errors)[0].message}
              </div>
            )}
          </div>
        </div>

        <input
          type="submit"
          value={isSubmitting ? "Sending..." : "Order"}
          disabled={!isValid || isSubmitting}
          className={styles.submitBtn}
        />
      </form>
      <ToastContainer />
    </>
  );
}
