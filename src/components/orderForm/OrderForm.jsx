import styles from "./orderForm.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import {VALIDATION, BASE_URL} from '../../../constants'

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

      const response = await fetch(`${BASE_URL}/order/send`, {
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
            {...register("name", VALIDATION.name)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            placeholder="Phone number"
            {...register("phoneNumber", VALIDATION.phoneNumber)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            placeholder="Email"
            {...register("email", VALIDATION.email)}
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
    </>
  );
}
