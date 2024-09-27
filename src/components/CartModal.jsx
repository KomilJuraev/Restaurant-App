import { forwardRef, useRef, useState } from "react";
import CheckoutModal from "./CheckoutModal";

const CartModal = forwardRef(function CartModal({ selectedMeals, onDecrement, onIncrement, onReset }, ref) {
    const [submited, setSubmited] = useState(false);

    let totalPrice = 0;

    const dialog = useRef();

    function handleCheckout() {
        dialog.current.showModal();
    }

    function handleCloseBtn() {
        dialog.current.close();
        setSubmited(false);
    }

    let totalAmount = selectedMeals.reduce((accum, meal) => {
        return accum += meal.price * meal.count
    }, 0).toFixed(2);

    return (
        <>
            <CheckoutModal ref={dialog} orderData={selectedMeals} totalAmount={totalAmount} onSelect={handleCloseBtn} onReset={onReset} submited={submited} onSubmit={() => setSubmited(true)} />
            <dialog ref={ref} className="cart-modal">
                <div className="modal-header">
                    <h3>Your Food Cart</h3>
                    {selectedMeals.length === 0 && <p className="no-items-msg">You do not have any items on the cart</p>}
                </div>
                <ul>
                    {
                        selectedMeals.map((meal) => {
                            totalPrice = meal.price * meal.count;
                            totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
                            return (
                                <li className="cart-item" key={meal.id}>
                                    <div className="food-name-section">
                                        <p>{meal.name}</p>
                                    </div>
                                    <div className="quantity-section">
                                        <button className="decrement-btn" onClick={() => onDecrement(meal.id)}>-</button>
                                        <p>{meal.count}</p>
                                        <button className="increment-btn" onClick={() => onIncrement(meal.id)}>+</button>
                                    </div>
                                    <div>
                                        <p className="total-price-section">$ {totalPrice}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <form method="dialog" className="modal-form">
                    {selectedMeals.length > 0 && <button className="continue-btn" onClick={handleCheckout}>Continue to Checkout</button>}
                    <button className="close-btn">Close</button>
                </form>
            </dialog>
        </>
    )
})

export default CartModal;