type ProductCardProps = {
    id: string | number;
    name: string;
    description: string;
    price: number | string;
    onEdit?: (id: string | number) => void;
}

export default function ProductCard({ id, name, description, price, onEdit }: ProductCardProps){
    return (
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