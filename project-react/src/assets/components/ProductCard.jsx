export default function ProductCard({ id, name, description, price, onEdit }){
    return (
        // rendering the product card
        <div className="product-card">
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="price">KSH {price}</p>
            {onEdit && (
                <button onClick={() => onEdit(id)} style={{marginTop: "8px"}}>
                    ✏️ Edit
                </button>
            )}
        </div>
    );
}