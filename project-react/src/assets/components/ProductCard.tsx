export default function ProductCard({name, description, price}: {name: string, description: string, price: number}){
    return (
        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>KSH-{price}</p>
        </div>
    );
}   