export default function Header({number, onCartClick}) {
    return (
        <div className="header-container">
            <p className="restaurant-name">
                Simply Delicious
            </p>
            <button className="cart" onClick={onCartClick}>
                Cart ({number})
            </button>
        </div>
    )
}