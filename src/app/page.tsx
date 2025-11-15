'use client'

import { useState } from 'react'
import { menuData, categories } from '@/lib/menu-data'
import { CartItem } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { ShoppingCart, Plus, Minus, Trash2, Phone, MapPin, User } from 'lucide-react'

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Pizzas - Queijos')
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleCheckout = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Por favor, preencha todos os campos')
      return
    }

    const total = getTotal()

    // Salvar no Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_address: customerAddress,
          items: cart,
          total: total,
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Erro ao salvar pedido:', error)
      alert('Erro ao processar pedido. Tente novamente.')
      return
    }

    // Montar mensagem WhatsApp
    let message = `Pedido - Ponto Certo\n\n`
    message += `Cliente: ${customerName}\n`
    message += `Telefone: ${customerPhone}\n`
    message += `Endereco: ${customerAddress}\n\n`
    message += `Itens:\n`
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}\n`
    })
    
    message += `\nTotal: R$ ${total.toFixed(2)}\n\n`
    message += `Forma de pagamento:\n`
    message += `Observacoes:`

    const whatsappNumber = '5535910015149'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    window.open(whatsappUrl, '_blank')
    
    // Limpar carrinho
    setCart([])
    setCustomerName('')
    setCustomerPhone('')
    setCustomerAddress('')
    setShowCheckout(false)
    setShowCart(false)
  }

  const filteredMenu = menuData.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#DC143C] text-white sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold">PONTO CERTO</h1>
              <p className="text-sm sm:text-base text-white/90">Lanchonete e Pizzaria</p>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-white text-[#DC143C] p-3 sm:p-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#DC143C] to-[#8B0000] text-white py-12 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Sabor que Conquista!
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90">
            As melhores pizzas e lanches da região
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+5535910015149"
              className="bg-white text-[#DC143C] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              (35) 91001-5149
            </a>
            <a
              href="tel:+5535910177735"
              className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-[#DC143C] transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              (35) 91017-7735
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-900 py-6 sticky top-[88px] sm:top-[104px] z-40 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <div className="flex gap-2 sm:gap-4 pb-2 min-w-max">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#DC143C] text-white shadow-lg scale-105'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-8 sm:py-12 bg-black">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
            {selectedCategory}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredMenu.map(item => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-800 hover:border-[#DC143C]"
              >
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{item.name}</h4>
                <p className="text-sm sm:text-base text-gray-400 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-yellow-400">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#DC143C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#FF1744] transition-all duration-300 shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
          <div className="bg-gray-900 w-full sm:w-96 h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#DC143C] text-white p-4 sm:p-6 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold">Seu Pedido</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-white hover:text-yellow-400 transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Carrinho vazio</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-800 rounded-xl p-4 mb-4 shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-sm sm:text-base">{item.name}</h4>
                          <p className="text-yellow-400 font-semibold text-sm sm:text-base">
                            R$ {item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-700 rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-[#DC143C] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#FF1744] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-[#DC143C] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#FF1744] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-white font-bold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="bg-gray-800 rounded-xl p-4 sm:p-6 mb-4 shadow-lg">
                    <div className="flex justify-between items-center text-xl sm:text-2xl font-bold">
                      <span className="text-white">Total:</span>
                      <span className="text-yellow-400">R$ {getTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowCart(false)
                      setShowCheckout(true)
                    }}
                    className="w-full bg-[#DC143C] text-white py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[#FF1744] transition-all duration-300 shadow-xl"
                  >
                    Finalizar Pedido
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              Finalizar Pedido
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white mb-2 font-semibold flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-xl px-4 py-3 focus:border-[#DC143C] focus:outline-none transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Telefone
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-xl px-4 py-3 focus:border-[#DC143C] focus:outline-none transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Endereço Completo
                </label>
                <textarea
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-xl px-4 py-3 focus:border-[#DC143C] focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-white">Total:</span>
                <span className="text-yellow-400">R$ {getTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-full font-semibold hover:bg-gray-600 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-[#DC143C] text-white py-3 rounded-full font-bold hover:bg-[#FF1744] transition-all duration-300 shadow-lg"
              >
                Enviar Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 border-t-4 border-[#DC143C]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">PONTO CERTO</h3>
          <p className="text-gray-400 mb-6">Lanchonete e Pizzaria</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <a href="tel:+5535910015149" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" />
              (35) 91001-5149
            </a>
            <a href="tel:+5535910177735" className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" />
              (35) 91017-7735
            </a>
          </div>
          <p className="text-gray-500 text-sm">© 2024 Ponto Certo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
