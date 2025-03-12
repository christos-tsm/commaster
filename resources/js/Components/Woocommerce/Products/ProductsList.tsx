import Message from "@/Components/Message";
import { User } from "@/types";
import { Product } from "@/types/woocommerce";
import ProductItem from "./ProductItem";
import ProductsTableHeader from "./ProductsTableHeader";

interface ProductsListProps {
    products: Product[];
    user: User;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, user }) => {
    console.log(products);
    return (
        <>
            {products.length === 0 ? <Message message='Δεν βρέθηκαν παραγγελίες' type='info' /> : null}
            {products.length >= 1 ? <ProductsTableHeader /> : null}
            <div className='flex flex-col'>
                {products && products?.map((product: Product) => (
                    <ProductItem product={product} key={product.id} />
                ))}
            </div>
        </>
    )
}

export default ProductsList