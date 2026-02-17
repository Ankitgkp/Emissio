import Navbar from "./components/Navbar";
import EmailForm from "./components/EmailForm";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <EmailForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
