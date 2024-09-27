import { forwardRef } from "react";
import { submitCustomerInfo } from "../http-requests";

const CheckoutModal = forwardRef(function CheckoutModal({ totalAmount, onSelect, orderData, onReset, submited, onSubmit }, ref) {

    async function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target)
        const data = Object.fromEntries(fd.entries());
        console.log(data);
        const requestBody = {
            order: {
                customer: {
                    name: data['full-name'],
                    email: data.email,
                    street: data.street,
                    city: data.city,
                    ['zip-code']: data['zip-code']
                },
                items: orderData
            }
        }

        try {
            const response = await submitCustomerInfo(requestBody);
            if (response.message === "Order created!") {
                onReset();
                onSubmit(true);
            }    
        } catch(error) {
            console.error("Failed to submit customer information")
        }
    }

    return (
        <dialog ref={ref} className="cart-modal">
            {
                !submited ? (
                    <>
                        <div className="modal-header">
                            <h3>Checkout</h3>
                        </div>
                        <div>
                            <p className="total-container">Total Amount: $ {totalAmount}</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container">
                                <label htmlFor="full-name" className="input-label" >Full Name: </label>
                                <input type="text" name="full-name" required />
                            </div>
                            <div className="input-container">
                                <label htmlFor="email" className="input-label">Email Address: </label>
                                <input type="email" name="email" required />
                            </div>
                            <div className="input-container">
                                <label htmlFor="street" className="input-label">Street: </label>
                                <input type="text" name="street" required />
                            </div>
                            <div className="input-container">
                                <label htmlFor="zip-code" className="input-label">Zip-Code: </label>
                                <input type="text" name="zip-code" required />
                            </div>
                            <div className="input-container">
                                <label htmlFor="city" className="input-label">City: </label>
                                <input type="text" name="city" required />
                            </div>
                            <div className="modal-form" id="checkout-form">
                                <button type="submit" className="continue-btn">Submit</button>
                                <button className="close-btn" onClick={onSelect}>Close</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="success-container">
                        <h3 className="main-success-msg">Thank you for your order!</h3>
                        <p className="second-success-msg">We're preparing it now. Your delicious meal will be with you shortly!</p>
                        <div className="success-btn-cont">
                            <button className="close-btn" onClick={onSelect}>Close</button>
                        </div>
                    </div>
                )
            }
        </dialog>
    )
})

export default CheckoutModal;