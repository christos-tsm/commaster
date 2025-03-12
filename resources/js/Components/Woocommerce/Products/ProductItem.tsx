import { Product } from '@/types/woocommerce'
import { Link } from '@inertiajs/react'
import { format } from 'date-fns'
import { ArrowDownFromLine, ArrowUpFromLine, Check, Eye, Settings, X } from 'lucide-react'
import { useState } from 'react'

const ProductItem = ({ product }: { product: Product }) => {
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

    return (
        <div data-product={product.id} className={`grid md:grid-cols-8 gap-x-4 duration-300 text-sm border border-gray-200 bg-white even:bg-theme-primary/5 hover:border-theme-primary items-center`} >
            <div className='text-sm font-medium p-4'>
                #{product.id} - SKU: {product.sku ? product.sku : '-'}
            </div>
            <div className='text-sm font-medium p-4'>
                {product.name}
            </div>
            <div className='text-sm font-medium p-4'>
                {product.images[0] ? <img src={product.images[0].src} width={30} height={30} /> : '-'}
            </div>
            <div className='text-sm font-medium p-4'>
                {format(new Date(product.date_created), 'dd/MM/yyyy HH:mm')}
            </div>
            <div className='text-sm font-medium p-4'>
                <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
            </div>
            <div className='text-sm font-medium p-4'>
                {product.stock_status === 'instock' ? <span className='text-green-500'>Σε απόθεμα</span> : <span className='text-red-500'>Εξαντλημένο</span>}
            </div>
            <div className='text-sm font-medium p-4'>
                {product.categories.length >= 1 ?
                    product.categories.map(cat => <p key={cat.id}>{cat.name}</p>)
                    : '-'}
            </div>
            <div className='text-sm flex items-center gap-2 justify-end p-4'>
                <Link href={`/products/${product.id}`}>
                    <Settings strokeWidth={1} width={20} height={20} />
                </Link>
                <a href={product.permalink} target='_blank' rel='noopener'><Eye strokeWidth={1} width={20} height={20} /></a>
                {detailsOpen ? <ArrowUpFromLine className='cursor-pointer' width={20} height={20} onClick={() => setDetailsOpen(!detailsOpen)} /> : <ArrowDownFromLine className='cursor-pointer' width={20} height={20} onClick={() => setDetailsOpen(!detailsOpen)} />}
            </div>
            <div className={`col-span-8 ${detailsOpen ? 'block' : 'hidden'} p-4`}>
                <div className="flex gap-4">
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Απόθεμα</h3>
                        <p className='flex items-center gap-2'>Διαχ/ση αποθέματος: {product.manage_stock ? <Check strokeWidth={1} width={20} height={20} color='green' /> : <X strokeWidth={1} width={20} height={20} color='red' />}</p>
                        {product.stock_quantity ? <p>Απόθεμα: {product.stock_quantity}</p> : null}
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Τελευταία επεξεργασία</h3>
                        <p>{format(new Date(product.date_modified_gmt), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Ιδιότητες</h3>
                        {product.attributes.length >= 1 ?
                            product.attributes.map(attr =>
                                <div key={attr.id} className='flex gap-2'>
                                    <h4 className='font-bold uppercase text-sm'>{attr.name}:</h4>
                                    <ul className='flex flex-wrap gap-1'>
                                        {attr.options.map((opt, index) => <li key={index}>{opt}</li>)}
                                    </ul>
                                </div>
                            )
                            : '-'}
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Cross sells IDs</h3>
                        {product.cross_sell_ids.length >= 1 ?
                            product.cross_sell_ids.map(csid =>
                                <div key={csid} className='flex gap-2'>
                                    <h4 className='font-bold uppercase text-sm'>ID Προϊόντος: {csid}</h4>
                                </div>
                            )
                            : '-'}
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Διαστάσεις</h3>
                        {product.dimensions.height && product.dimensions.length && product.dimensions.width ?
                            <ul>
                                <li><strong>Μήκος:</strong> {product.dimensions.width}</li>
                                <li><strong>Ύψος:</strong> {product.dimensions.height}</li>
                                <li><strong>Πλάτος:</strong> {product.dimensions.length}</li>
                            </ul>
                            : '-'}
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Tags</h3>
                        {product.tags.length >= 1 ?
                            product.tags.map(tag => <p key={tag.id}>{tag.name}</p>)
                            : '-'}
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Προπαραγγελία</h3>
                        {product.backorders_allowed ? <p>Επιτρεπομένη</p> : <p>Μη ενεργοποιημένη</p>}
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <h3 className='font-bold uppercase border-b border-b-gray-400'>Custom Metas</h3>
                        {product.meta_data.length >= 1 ?
                            product.meta_data.map(meta => <p key={meta.id}>{meta.key}: {meta.value}</p>)
                            : '-'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem