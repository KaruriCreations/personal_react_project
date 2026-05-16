type ProductCardProps = {
    id: string | number;
    name: string;
    description: string;
    price: number | string;
    onEdit?: (id: string | number) => void;
}

export default function ProductCard({ id, name, description, price, onEdit }: ProductCardProps){
    return (
        <div style={{border: "1px solid #ccc", padding: "12px", margin: "8px", borderRadius: "8px"}}>
            <h3>{name}</h3>
            <p>{description}</p>
            <p><strong>KSH {price}</strong></p>
            {onEdit && (
                <button onClick={() => onEdit(id)} style={{marginTop: "8px"}}>
                    ✏️ Edit
                </button>
            )}
        </div>
    );
}