import bannerImg from "../assets/images/banner.png";

export default function Hero() {
  return (
    <header className="bg-green-50 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Sambhalpuri Bazaar</h1>
      <p className="text-gray-600 mb-6">Authentic Handloom & Culture</p>
       <img
          src={bannerImg}
          alt="Sambhalpuri Banner"
          className="mx-auto rounded-lg shadow-lg max-h-80 object-cover"
        />
    </header>
  );
}
