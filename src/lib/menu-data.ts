export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export const menuData: MenuItem[] = [
  // Pizzas - Queijos
  { id: 'p1', name: '3 QUEIJOS', description: 'Muçarela, Catupiry, Cheddar, Orégano', price: 40, category: 'Pizzas - Queijos' },
  { id: 'p2', name: '4 QUEIJOS', description: 'Molho de Tomate, Catupiry, Muçarela, Parmesão, Cheddar, Orégano', price: 40, category: 'Pizzas - Queijos' },
  { id: 'p3', name: '5 QUEIJOS', description: 'Molho de Tomate, Provolone, Cheddar, Tomate, Muçarela, Catupiry, Parmesão, Orégano', price: 40, category: 'Pizzas - Queijos' },
  { id: 'p4', name: 'MARGHERITA', description: 'Molho de Tomate, Catupiry, Muçarela, Queijo Branco, Tomate, Orégano', price: 40, category: 'Pizzas - Queijos' },
  
  // Pizzas - Frango
  { id: 'p5', name: 'FRANGO CATUPIRY', description: 'Molho de Tomate, Frango, Milho, Catupiry, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p6', name: 'FRANGO COM MUSSARELA', description: 'Frango, Milho, Muçarela, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p7', name: 'CARIOCA', description: 'Frango, Milho, Palmito, Muçarela, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p8', name: 'CARVALHOS', description: 'Frango, Bacon, Catupiry, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p9', name: 'FRANGO ESPECIAL', description: 'Frango, Milho, Ervilha, Palmito, Muçarela, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p10', name: 'FRANCESA', description: 'Frango, Palmito, Catupiry, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p11', name: 'APOLO', description: 'Frango, Milho Verde, Bacon, Muçarela, Orégano', price: 40, category: 'Pizzas - Frango' },
  { id: 'p12', name: 'A MODA DE FRANGO', description: 'Frango Desfiado, Presunto, Cream Cheese, Muçarela', price: 43, category: 'Pizzas - Frango' },
  { id: 'p13', name: 'SERTANEJA', description: 'Molho de Tomate, Frango, Palmito, Milho, Ervilha, Muçarela, Bacon, Orégano', price: 40, category: 'Pizzas - Frango' },
  
  // Pizzas - Carnes
  { id: 'p14', name: 'CALABRESA TRADICIONAL', description: 'Calabresa, Cebola, Muçarela, Orégano', price: 40, category: 'Pizzas - Carnes' },
  { id: 'p15', name: 'CALABRESA', description: 'Molho de Tomate, Presunto, Calabresa, Catupiry, Muçarela, Orégano', price: 40, category: 'Pizzas - Carnes' },
  { id: 'p16', name: 'BAURU', description: 'Molho de Tomate, Presunto, Tomate, Catupiry, Muçarela, Orégano', price: 40, category: 'Pizzas - Carnes' },
  { id: 'p17', name: 'LOMBINHO CANADENSE', description: 'Molho de Tomate, Lombinho, Catupiry, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Carnes' },
  { id: 'p18', name: 'PEITO DE PERU', description: 'Molho de Tomate, Peito de Peru, Milho, Catupiry, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Carnes' },
  { id: 'p19', name: 'AMERICANA', description: 'Molho de Tomate, Peito de Peru, Milho, Catupiry, Queijo Branco, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Carnes' },
  { id: 'p20', name: 'AMERICANA ESPECIAL', description: 'Presunto, Ervilha, Ovos, Muçarela, Orégano', price: 40, category: 'Pizzas - Carnes' },
  
  // Pizzas - Especiais
  { id: 'p21', name: 'PORTUGUESA', description: 'Molho de Tomate, Presunto, Ovos, Cebola, Milho, Muçarela, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  { id: 'p22', name: 'BAIANA', description: 'Molho de Tomate, Presunto, Ovos, Cebola, Milho, Muçarela, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  { id: 'p23', name: 'MISTA', description: 'Molho de Tomate, Presunto, Frango, Muçarela, Catupiry, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  { id: 'p24', name: 'MEXICANA', description: 'Molho de Tomate, Presunto, Frango, Tomate, Cheddar, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  { id: 'p25', name: 'CEARENSE', description: 'Molho de Tomate, Presunto, Calabresa, Frango, Catupiry, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  { id: 'p26', name: 'MODA DA CASA', description: 'Molho de Tomate, Peito de Peru, Calabresa, Catupiry, Queijo Branco, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  { id: 'p27', name: 'MODA DO PIZZAIOLO', description: 'Calabresa, Catupiry, Cheddar, Cream Cheese, Cebola, Muçarela', price: 43, category: 'Pizzas - Tradicionais' },
  { id: 'p28', name: 'A GREGA', description: 'Presunto, Ervilha, Palmito, Muçarela, Orégano', price: 40, category: 'Pizzas - Tradicionais' },
  
  // Pizzas - Vegetarianas
  { id: 'p29', name: 'PALMITO', description: 'Molho de Tomate, Palmito, Presunto, Ervilha, Milho, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Vegetarianas' },
  { id: 'p30', name: 'VEGETARIANA', description: 'Molho de Tomate, Brócolis, Milho, Tomate, Muçarela, Queijo Branco, Orégano', price: 40, category: 'Pizzas - Vegetarianas' },
  { id: 'p31', name: 'MINEIRA', description: 'Molho de Tomate, Brócolis, Milho, Catupiry, Muçarela, Tomate, Orégano', price: 40, category: 'Pizzas - Vegetarianas' },
  { id: 'p32', name: 'BRÓCOLIS', description: 'Brócolis, Bacon, Muçarela, Orégano', price: 40, category: 'Pizzas - Vegetarianas' },
  { id: 'p33', name: 'BRÓCOLIS ESPECIAL', description: 'Brócolis, Bacon, Frango, Catupiry, Muçarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas - Vegetarianas' },
  { id: 'p34', name: 'ATUM', description: 'Molho de Tomate, Atum, Cebola, Milho, Catupiry, Muçarela, Orégano', price: 40, category: 'Pizzas - Vegetarianas' },
  
  // Pizzas Especiais Premium
  { id: 'pe1', name: 'CALABRESA ESPECIAL', description: 'Calabresa, Palmito, Bacon, Catupiry, Mussarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe2', name: 'BRÓCOLIS ESPECIAL', description: 'Brócolis, Bacon, Frango, Catupiry, Mussarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe3', name: 'FRANGO ESPECIAL', description: 'Frango, Bacon, Catupiry, Cheddar, Mussarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe4', name: '5 QUEIJOS ESPECIAL', description: 'Catupiry, Mussarela, Provolone, Cheddar, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe5', name: 'PONTO CERTO ESPECIAL', description: 'Frango, Palmito, Milho, Bacon, Mussarela, Catupiry, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe6', name: 'CEARENSE ESPECIAL', description: 'Presunto, Calabresa, Bacon, Frango, Mussarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe7', name: 'LOMBO ESPECIAL', description: 'Lombo, Tomate, Catupiry, Mussarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe8', name: 'À MODA ESPECIAL', description: 'Presunto, Peito de Peru, Frango, Mussarela, Cream Cheese, Orégano', price: 50, category: 'Pizzas Especiais' },
  { id: 'pe9', name: 'CHOCOLATE ESPECIAL', description: 'Chocolate Preto, Chocolate Branco, Morango', price: 50, category: 'Pizzas Especiais' },
  
  // Pizzas Doces
  { id: 'pd1', name: 'CHOCOLATE', description: 'Chocolate, M&Ms, Chocolate branco', price: 40, category: 'Pizzas Doces' },
  { id: 'pd2', name: 'CHOCOBANANA', description: 'Chocolate, Banana, Chocolate', price: 40, category: 'Pizzas Doces' },
  { id: 'pd3', name: 'BANANA', description: 'Banana, Mussarela, Leite Condensado, Canela', price: 40, category: 'Pizzas Doces' },
  
  // Bordas
  { id: 'b1', name: 'BORDA DE MUSSARELA', description: 'Borda recheada com mussarela', price: 3, category: 'Bordas' },
  { id: 'b2', name: 'BORDA DE CATUPIRY', description: 'Borda recheada com catupiry', price: 3, category: 'Bordas' },
  { id: 'b3', name: 'BORDA DE CHOCOLATE', description: 'Borda recheada com chocolate', price: 3, category: 'Bordas' },
  { id: 'b4', name: 'BORDA DE CHEDDAR', description: 'Borda recheada com cheddar', price: 3, category: 'Bordas' },
  
  // Lanches
  { id: 'l1', name: 'CACHORRO QUENTE NA CHAPA', description: 'Salsicha, Bacon, Frango Desfiado, Milho, Maionese, Tomate, Ketchup, Batata Palha', price: 13, category: 'Lanches' },
  { id: 'l2', name: 'À MODA', description: 'Pão, Lombo, Presunto, Ovo, Cheddar, Queijo, Alface, Tomate', price: 15, category: 'Lanches' },
  { id: 'l3', name: 'MISTÃO', description: 'Pão, Hambúrguer, Presunto, Frango Desfiado, Ovo, Catupiry, Cheddar, Mussarela, Alface, Tomate', price: 15, category: 'Lanches' },
  { id: 'l4', name: 'AMERICANO', description: 'Pão, Presunto, Ovo, Maionese, Alface, Tomate, Queijo', price: 13, category: 'Lanches' },
  { id: 'l5', name: 'MISTO QUENTE', description: 'Pão, Presunto, Queijo', price: 13, category: 'Lanches' },
  { id: 'l6', name: 'X-TUDO', description: 'Pão, Hambúrguer, Milho, Tomate, Alface, Maionese, Calabresa, Bacon, Ovo, Mussarela, Queijo', price: 15, category: 'Lanches' },
  { id: 'l7', name: 'X-CALABRESA', description: 'Pão, Hambúrguer, Calabresa, Queijo, Alface, Tomate', price: 14, category: 'Lanches' },
  { id: 'l8', name: 'X-EGG', description: 'Pão, Hambúrguer, Ovo, Queijo, Alface, Tomate', price: 14, category: 'Lanches' },
  { id: 'l9', name: 'X-BACON', description: 'Pão, Hambúrguer, Bacon, Queijo, Alface, Tomate', price: 15, category: 'Lanches' },
  { id: 'l10', name: 'X-SALADA', description: 'Pão, Hambúrguer, Queijo, Alface, Tomate', price: 14, category: 'Lanches' },
  { id: 'l11', name: 'X-BURGUER', description: 'Pão, Hambúrguer, Queijo', price: 13, category: 'Lanches' },
  { id: 'l12', name: 'X-TUDO ESPECIAL', description: 'Pão, 2 Hambúrgueres, Ovo, Presunto, Milho, Batata Palha, Bacon, Catupiry, Queijo, Alface, Tomate', price: 20, category: 'Lanches' },
  
  // Bebidas
  { id: 'beb1', name: 'FANTA UVA 2L', description: 'Refrigerante Fanta Uva 2 litros', price: 13, category: 'Bebidas' },
  { id: 'beb2', name: 'FANTA LARANJA 2L', description: 'Refrigerante Fanta Laranja 2 litros', price: 13, category: 'Bebidas' },
  { id: 'beb3', name: 'GUARANÁ 2L', description: 'Refrigerante Guaraná 2 litros', price: 13, category: 'Bebidas' },
  { id: 'beb4', name: 'COCA-COLA 2L', description: 'Refrigerante Coca-Cola 2 litros', price: 15, category: 'Bebidas' },
  { id: 'beb5', name: 'GUARANÁ 1L', description: 'Refrigerante Guaraná 1 litro', price: 10, category: 'Bebidas' },
  { id: 'beb6', name: 'COCA-COLA 600ML', description: 'Refrigerante Coca-Cola 600ml', price: 8, category: 'Bebidas' },
  { id: 'beb7', name: 'FANTA UVA 350ML', description: 'Refrigerante Fanta Uva lata', price: 6, category: 'Bebidas' },
  { id: 'beb8', name: 'FANTA LARANJA 350ML', description: 'Refrigerante Fanta Laranja lata', price: 6, category: 'Bebidas' },
  { id: 'beb9', name: 'GUARANÁ 350ML', description: 'Refrigerante Guaraná lata', price: 6, category: 'Bebidas' },
  { id: 'beb10', name: 'COCA-COLA 350ML', description: 'Refrigerante Coca-Cola lata', price: 7, category: 'Bebidas' },
  { id: 'beb11', name: 'SKOL 350ML', description: 'Cerveja Skol lata', price: 5, category: 'Bebidas' },
]

export const categories = [
  'Pizzas - Queijos',
  'Pizzas - Frango',
  'Pizzas - Carnes',
  'Pizzas - Tradicionais',
  'Pizzas - Vegetarianas',
  'Pizzas Especiais',
  'Pizzas Doces',
  'Bordas',
  'Lanches',
  'Bebidas'
]
