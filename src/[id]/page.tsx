"use client";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';

const products = [
  { id: 1, name: "Guitar", price: 29990, image_url: "https://r2.gear4music.com/media/23/232378/600/preview.jpg" },
  { id: 2, name: "Bass", price: 25000, image_url: "https://www.behngiepseng.com/cdn/shop/files/Squier-Debut-Precision-Bass-Black-4_1024x.jpg?v=1719382342" },
  { id: 3, name: "Microphone", price: 15000, image_url: "https://www.atprosound.com/wp-content/uploads/2020/10/TOA-DM-270-AS-700x700.jpg" },
  { id: 4, name: "Piano", price: 220000, image_url: "https://ca.yamaha.com/en/files/CVP-909GP_a_0001_acd3f46bb86a91862194d5e642775efe.jpg?impolicy=resize&imwid=396&imhei=396" },
  { id: 5, name: "Acoustic guitar", price: 5900, image_url: "https://www.bigtone.in.th/wp-content/uploads/2021/04/EP-J-15-EC-01.jpg" },
  { id: 6, name: "Amps", price: 3000, image_url: "https://m.media-amazon.com/images/I/71zItcrZJGL.jpg" },
  { id: 7, name: "Saxophone", price: 20000, image_url: "https://www.theeramusic.com/wp-content/uploads/2021/11/YAMAHA-YAS-26.jpg" },
  { id: 8, name: "inear", price: 3000, image_url: "https://audio46.com/cdn/shop/products/InEar_ProPhile_8_740x.png?v=1651592772" },
  { id: 9, name: "Drums", price: 50000, image_url: "https://media.ctmusicshop.com/wp-content/uploads/2024/05/25212822/Yamaha-Rydeen-Drum-Orange-Glitter.jpg" },
  { id: 10, name: "Ukulele", price: 4500, image_url: "https://m.media-amazon.com/images/I/71N3o2SHmIL._AC_SL1500_.jpg" },
];

const ProductPage = () => {
  const params = useParams(); 
  const productId = parseInt(params.id); 

  const [isLoading, setIsLoading] = useState(true);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); 
    return () => clearTimeout(timer); 
  }, []);

  const product = products.find(p => p.id === productId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-white">Product not found</div>; 
  }

  const editInstrument = (id) => {
    const newName = prompt("Enter new name:", product.name);
    const newPrice = prompt("Enter new price:", product.price);
    if (newName && newPrice) {
      setEditedProduct({ ...product, name: newName, price: parseFloat(newPrice) });
      alert(`Instrument updated: Name - ${newName}, Price - $${newPrice}`);
    }
  };

  const displayProduct = editedProduct || product;

  return (
    <>
      <Head>
        <title>{displayProduct.name} | Music Store</title>
        <meta name="description" content={`${displayProduct.name} - Buy now at the best price`} />
        <meta name="keywords" content="music, instruments, guitars, piano, drums" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b flex items-center justify-center">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg">
          <img src={displayProduct.image_url} alt={displayProduct.name} className="w-full h-48 bg-cover rounded-t-lg shadow-md transform transition duration-500 hover:scale-105" />
          <h2 className="text-2xl font-bold mt-4 text-white">{displayProduct.name}</h2>
          <p className="text-lg font-semibold text-white">Price: ${displayProduct.price}</p>
          <p className="text-gray-300 mt-2">{displayProduct.description}</p>
          <p className='text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo atque blanditiis, cum similique dolor assumenda eum dolores adipisci at vero asperiores explicabo beatae laboriosam modi veniam autem architecto minima eligendi.</p>
          <button 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => window.history.back()}
          >
            Back to Products
          </button>
          <button onClick={() => editInstrument(displayProduct.id)} className="edit-button border-2 m-2 p-1">Edit</button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;