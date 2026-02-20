import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ChevronRight, Star, Truck, ShieldCheck, CreditCard, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';

// --- Components ---

const TopBar = () => (
  <div className="bg-black text-white text-[10px] md:text-xs font-bold py-2 text-center uppercase tracking-wider">
    Parcele Em Até 12x Vezes no Cartão.
  </div>
);

const Navbar = ({ cartCount, onCartClick }: { cartCount: number, onCartClick: () => void }) => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button className="p-2">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex-1 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="bg-black text-white px-2 py-1 rounded-md font-black text-sm leading-none tracking-tighter text-center shadow-lg transform -rotate-1">
              PROJETO<br/>REIMINIATURAS
            </div>
            <div className="text-[7px] font-black uppercase tracking-[0.2em] mt-1 text-brand-primary">O SOM EM MINIATURA</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2">
            <Search className="w-6 h-6" />
          </button>
          <button onClick={onCartClick} className="relative p-2">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-brand-primary text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/5511999999999" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-[90] bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
  >
    <MessageCircle className="w-7 h-7 fill-current" />
  </a>
);

const Hero = () => (
  <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://picsum.photos/seed/paredao-hero/1200/800" 
        className="w-full h-full object-cover"
        alt="Hero background"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
    <div className="relative text-center text-white px-4">
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl"
      >
        SEJA BEM VINDO!
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm md:text-xl font-bold tracking-widest uppercase"
      >
        OS MELHORES PROJETOS ESTÃO AQUI!
      </motion.div>
    </div>
  </section>
);

const AnnouncementBar = () => (
  <div className="bg-white py-4 text-center border-b border-gray-100">
    <span className="text-brand-primary font-bold text-sm md:text-base uppercase tracking-tight">
      ATENÇÃO! Temos poucos projetos em estoque
    </span>
  </div>
);

const ProductCard = ({ product, onAddToCart }: { product: Product, onAddToCart: (p: Product) => void, key?: React.Key }) => (
  <div className="bg-white rounded-lg overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm">
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      <img 
        src={product.image_url} 
        alt={product.name}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {product.promo_price && (
        <div className="absolute bottom-2 right-2 bg-brand-primary text-white text-[10px] font-bold px-3 py-1 rounded shadow-sm uppercase">
          Promoção
        </div>
      )}
    </div>
    <div className="p-3 flex flex-col flex-1 text-center">
      <h3 className="font-bold text-sm md:text-base mb-2 line-clamp-2">{product.name}</h3>
      <div className="mt-auto">
        {product.promo_price ? (
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-gray-400 line-through">R$ {product.price.toFixed(2)}</span>
            <span className="text-sm md:text-lg font-bold text-gray-800">De R$ {product.promo_price.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-sm md:text-lg font-bold text-gray-800">R$ {product.price.toFixed(2)}</span>
        )}
      </div>
      <button 
        onClick={() => onAddToCart(product)}
        className="mt-3 w-full bg-brand-primary text-white py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-brand-primary/90 transition-colors"
      >
        Comprar
      </button>
    </div>
  </div>
);

const CouponSection = () => (
  <section className="py-12 bg-white text-center px-4">
    <h3 className="text-brand-primary text-2xl font-black mb-2 uppercase italic">Novo por aqui?</h3>
    <p className="text-brand-primary font-bold text-sm">
      "CUPOM5" para 5% de desconto em suas compras!
    </p>
  </section>
);

const SecondaryBanner = () => (
  <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://picsum.photos/seed/paredao-child/1200/800" 
        className="w-full h-full object-cover"
        alt="Secondary banner"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
    <div className="relative text-center text-white px-6">
      <h3 className="text-2xl md:text-4xl font-black leading-tight drop-shadow-lg uppercase">
        CONFIRA NOSSO CATÁLOGO DE PROJETOS A PRONTA ENTREGA!
      </h3>
    </div>
  </section>
);

const RecentPurchaseToast = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('Lucas');
  const [city, setCity] = useState('São Paulo');

  useEffect(() => {
    const names = ['Lucas', 'Mateus', 'Gabriel', 'Ana', 'Julia', 'Pedro', 'Tiago'];
    const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Fortaleza', 'Salvador'];
    
    const interval = setInterval(() => {
      setName(names[Math.floor(Math.random() * names.length)]);
      setCity(cities[Math.floor(Math.random() * cities.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto z-[100] bg-white rounded-lg shadow-2xl p-3 flex items-center gap-3 border border-gray-100 max-w-sm"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={`https://i.pravatar.cc/150?u=${name}`} alt="User" />
          </div>
          <div className="text-[10px] leading-tight">
            <span className="font-bold">{name}</span> acabou de comprar o produto <span className="font-bold">Mini Paredão</span> em <span className="font-bold">{city}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onUpdateQuantity: (id: number, delta: number) => void,
  onRemove: (id: number) => void
}) => {
  const total = items.reduce((acc, item) => acc + (item.promo_price || item.price) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-black uppercase italic text-brand-primary">Carrinho</h2>
              <button onClick={onClose} className="p-2"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <ShoppingCart className="w-16 h-16 mb-4" />
                  <p className="font-bold uppercase tracking-widest">Vazio</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="w-20 h-20 rounded bg-gray-50 overflow-hidden flex-shrink-0">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-xs mb-1 line-clamp-1">{item.name}</h4>
                      <div className="text-brand-primary font-black text-sm mb-2">
                        R$ {((item.promo_price || item.price) * item.quantity).toFixed(2)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded overflow-hidden">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-100"><X className="w-3 h-3" /></button>
                          <span className="px-3 text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-100"><ChevronRight className="w-3 h-3 rotate-[-90deg]" /></button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-[10px] font-bold text-red-500 uppercase">Remover</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500 font-bold uppercase text-xs">Total</span>
                <span className="text-xl font-black text-brand-primary">R$ {total.toFixed(2)}</span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full bg-brand-primary text-white py-4 rounded font-black uppercase tracking-widest hover:bg-brand-primary/90 transition-all disabled:opacity-50"
              >
                Finalizar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer className="bg-brand-primary text-white py-12 px-6">
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="space-y-4">
        <h4 className="text-xl font-black uppercase italic">Sobre nós</h4>
        <p className="text-sm leading-relaxed font-medium">
          A <span className="font-black">Paredão Brasil</span> nasceu da rua, da paixão pelo som alto e da vontade de levar a vibração do paredão pra qualquer lugar.
        </p>
        <p className="text-sm leading-relaxed font-medium">
          Aqui não tem brinquedo: tem <span className="font-black">grave de verdade</span>, potência, estilo e presença.
        </p>
        <p className="text-sm leading-relaxed font-medium">
          Cada mini paredão, cada detalhe e cada acabamento é pensado pra quem vive o som dentro e fora dos eventos, seja no rolê, na garagem ou reunindo a galera.
        </p>
        <p className="text-sm leading-relaxed font-medium">
          Nosso propósito é fortalecer a cena do som automotivo, conectar quem é apaixonado por grave em todo o Brasil e mostrar que paredão não é só barulho — é <span className="font-black">cultura</span>, é <span className="font-black">lifestyle</span>, é <span className="font-black">respeito</span>.
        </p>
        <p className="text-sm font-black italic">Grave ligado, respeito garantido</p>
      </div>

      <div className="space-y-4 pt-6 border-t border-white/20">
        <h4 className="text-xl font-black uppercase italic">Central de Atendimento</h4>
        <div className="space-y-2 text-sm font-bold">
          <p>Atendimento: seg. à sáb. 10 às 19h</p>
          <p>Email: atendimento@paredaobrasil.com</p>
          <p>CNPJ: 21.441.351/0001-08</p>
        </div>
      </div>

      <div className="pt-6 border-t border-white/20 flex justify-center gap-6">
        <Instagram className="w-6 h-6" />
        <Facebook className="w-6 h-6" />
        <MessageCircle className="w-6 h-6" />
      </div>
    </div>
  </footer>
);

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero />
        <AnnouncementBar />

        {/* Catalog Section */}
        <section className="py-10 bg-brand-primary">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-10 uppercase italic">
              Projetos Disponíveis
            </h2>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="bg-white/10 rounded-lg h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            )}
          </div>
        </section>

        <CouponSection />
        <SecondaryBanner />
      </main>

      <Footer />
      <RecentPurchaseToast />
      <WhatsAppButton />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}
