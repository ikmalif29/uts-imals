import Footer from "./components/Footer";
import Header from "./components/Header";
import Cars from "./pages/Cars";

function App() {

  const cars = [
    {
      id: 1,
      name: "Tesla Model S",
      price: 1200000,
      color: "Red",
      image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15540847/tesla-model-s.0.0.1445023528.jpg?quality=90&strip=all&crop=0,9.6858638743455,100,80.628272251309",
    },
    {
      id: 2,
      name: "BMW M4 Coupe",
      price: 1350000,
      color: "Blue",
      image: "https://cdn.motor1.com/images/mgl/A9BQL/s1/2021-bmw-m4-exterior.jpg",
    },
    {
      id: 3,
      name: "Ford Mustang GT",
      price: 1100000,
      color: "Black",
      image: "https://d1gl66oyi6i593.cloudfront.net/wp-content/uploads/2020/02/Ford-Mustang-Shelby-GT350-de-Fathouse-1.jpg",
    },
    {
      id: 4,
      name: "Lamborghini Huracan",
      price: 4500000,
      color: "Yellow",
      image: "https://www.imc.co.th/img/model/640_2022120415212068.jpg",
    },
    {
      id: 5,
      name: "Audi R8",
      price: 3000000,
      color: "White",
      image: "https://hips.hearstapps.com/hmg-prod/images/2023-audi-r8-gt-front-three-quarters-motion-3-1664827965.jpg?crop=0.684xw:0.577xh;0.0321xw,0.281xh&resize=2048:*",
    },
    {
      id: 6,
      name: "Mercedes-Benz AMG GT",
      price: 2500000,
      color: "Silver",
      image: "https://vehicle-images.dealerinspire.com/10a0-11000427/W1KRJ7JB5SF005620/09cae414d9a5861280a1b8dcfca3b8e4.jpg",
    },
    {
      id: 7,
      name: "Chevrolet Camaro",
      price: 1050000,
      color: "Orange",
      image: "https://di-uploads-pod33.dealerinspire.com/kearnymesachevy/uploads/2022/11/2023-chevy-camaro-orange.png",
    },
    {
      id: 8,
      name: "Porsche 911",
      price: 3200000,
      color: "Gray",
      image: "https://issimi-vehicles-cdn.b-cdn.net/publicamlvehiclemanagement/VehicleDetails/315/1.jpg?width=3840&quality=75",
    },
    {
      id: 9,
      name: "Nissan GT-R",
      price: 2200000,
      color: "Dark Gray",
      image: "https://static.republika.co.id/uploads/member/images/news/240316120642-273.jpg",
    },
    {
      id: 10,
      name: "Ferrari F8 Tributo",
      price: 5000000,
      color: "Red",
      image: "https://www.charles-pozzi.fr/wp-content/uploads/cp_images//1701126000/photo/1479/1/2223_2.jpg",
    }
  ];

  return (
    <>
      <main>
        <Header />
        <Cars cars={cars} />
        <Footer />
      </main>
    </>
  )
}

export default App
