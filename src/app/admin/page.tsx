'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Order } from '@/lib/types'
import { LogOut, Printer, CheckCircle, Clock, TrendingUp } from 'lucide-react'

// Forçar renderização dinâmica (não prerender)
export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
      const interval = setInterval(loadOrders, 5000) // Atualiza a cada 5 segundos
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = async () => {
    if (!supabase) {
      alert('Supabase não configurado. Configure as variáveis de ambiente.')
      return
    }

    setLoading(true)
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single()

    setLoading(false)

    if (data && !error) {
      setIsAuthenticated(true)
    } else {
      alert('Usuário ou senha incorretos')
    }
  }

  const loadOrders = async () => {
    if (!supabase) return

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (data && !error) {
      setOrders(data)
    }
  }

  const updateOrderStatus = async (orderId: number, status: string) => {
    if (!supabase) return

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)

    if (!error) {
      // Se concluído, criar registro em sales
      if (status === 'completed') {
        const order = orders.find(o => o.id === orderId)
        if (order) {
          await supabase
            .from('sales')
            .insert([
              {
                order_id: orderId,
                total: order.total
              }
            ])
        }
      }
      loadOrders()
    }
  }

  const printReceipt = (order: Order) => {
    const printWindow = window.open('', '', 'width=800,height=600')
    if (!printWindow) return

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cupom Fiscal - Pedido #${order.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            padding: 20px;
            max-width: 400px;
            margin: 0 auto;
          }
          h1 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .info {
            margin-bottom: 15px;
          }
          .info p {
            margin: 5px 0;
          }
          .items {
            border-top: 2px dashed #000;
            border-bottom: 2px dashed #000;
            padding: 10px 0;
            margin: 15px 0;
          }
          .item {
            margin: 8px 0;
          }
          .total {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
            margin-top: 15px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            border-top: 2px dashed #000;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>PONTO CERTO</h1>
          <p>Lanchonete e Pizzaria</p>
          <p>(35) 91001-5149 | (35) 91017-7735</p>
        </div>
        
        <div class="info">
          <p><strong>CUPOM FISCAL</strong></p>
          <p>Pedido: #${order.id}</p>
          <p>Data: ${new Date(order.created_at).toLocaleString('pt-BR')}</p>
          <p>Cliente: ${order.customer_name}</p>
          <p>Telefone: ${order.customer_phone}</p>
          <p>Endereco: ${order.customer_address}</p>
        </div>
        
        <div class="items">
          <p><strong>ITENS DO PEDIDO:</strong></p>
          ${order.items.map((item, index) => `
            <div class="item">
              <p>${index + 1}. ${item.name}</p>
              <p>   ${item.quantity}x R$ ${item.price.toFixed(2)} = R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          `).join('')}
        </div>
        
        <div class="total">
          <p>TOTAL: R$ ${order.total.toFixed(2)}</p>
        </div>
        
        <div class="footer">
          <p>Obrigado pela preferencia!</p>
          <p>Volte sempre!</p>
        </div>
      </body>
      </html>
    `

    printWindow.document.write(receiptHTML)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 250)
  }

  const getTotalSales = () => {
    return orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + Number(o.total), 0)
  }

  const getPendingOrders = () => {
    return orders.filter(o => o.status === 'pending').length
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#DC143C]">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">PONTO CERTO</h1>
          <p className="text-gray-400 text-center mb-8">Painel Administrativo</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2 font-semibold">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-xl px-4 py-3 focus:border-[#DC143C] focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2 font-semibold">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-xl px-4 py-3 focus:border-[#DC143C] focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#DC143C] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#FF1744] transition-all duration-300 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-[#DC143C] text-white p-6 shadow-2xl">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel Admin</h1>
            <p className="text-white/90">Ponto Certo - Gestão de Pedidos</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-white text-[#DC143C] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-semibold">Total de Vendas</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    R$ {getTotalSales().toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-yellow-100" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-semibold">Pedidos Pendentes</p>
                  <p className="text-3xl font-bold text-white mt-2">{getPendingOrders()}</p>
                </div>
                <Clock className="w-12 h-12 text-orange-100" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-semibold">Pedidos Concluídos</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {orders.filter(o => o.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Pedidos em Tempo Real</h2>
          
          {orders.length === 0 ? (
            <div className="bg-gray-900 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-lg">Nenhum pedido ainda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map(order => (
                <div
                  key={order.id}
                  className={`bg-gray-900 rounded-2xl p-6 shadow-xl border-2 transition-all duration-300 ${
                    order.status === 'pending'
                      ? 'border-yellow-500'
                      : 'border-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Pedido #{order.id}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold ${
                        order.status === 'pending'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                    </span>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <p className="text-white font-semibold mb-1">{order.customer_name}</p>
                    <p className="text-gray-400 text-sm">{order.customer_phone}</p>
                    <p className="text-gray-400 text-sm">{order.customer_address}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-yellow-400 font-semibold">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-gray-700 pt-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Total:</span>
                      <span className="text-yellow-400 font-bold text-xl">
                        R$ {Number(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => printReceipt(order)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Printer className="w-5 h-5" />
                      Imprimir
                    </button>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Concluir
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
