import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/shared";
import { HomePage, ProductPage, ProductCreatePage, PurchasePage, CartPage, NotFoundPage, } from "./pages";
function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/create" element={<ProductCreatePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/purchase/:productId" element={<PurchasePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App;