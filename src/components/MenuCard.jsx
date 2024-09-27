
export default function MenuCard({meal, onSelect}) {
    return (
        <td className="menu-card-container">
            <img className="meal-images" src={`http://localhost:5555/${meal.image}`} alt="meal-image" />
            <p className="meal-name">{meal.name}</p>
            <p className="price">$ {meal.price}</p>
            <p className="meal-desc">{meal.description}</p>
            <div className="add-button-container">
                <button onClick={onSelect}>Add</button>
            </div>
        </td>
    )
}