import React, { useState } from "react";
import { MapPin, Users, Calendar, Star } from "lucide-react";

export default function CompaniesDashboard() {
  const [companies] = useState([
    
    {
      id: 4,
      name: "AKFA Medline",
      logo: "https://akfamedline.com/media/news/IMG_1630.png",
      industry: "Medical Clinic",
      location: "Toshkent, O'zbekiston",
      employees: "150-200",
      rating: 4.7,
      description:
        "Davolash va diagnostika bo‘yicha yuqori sifatli tibbiy xizmatlar",
      founded: 2012,
      website: "https://akfamedline.com/",
    },
    {
      id: 5,
      name: "Nano Medical Clinic",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIYzEh-8GVOWXyNNbSC99fdyitgoQvJLthmQ&s",
      industry: "Medical Clinic",
      location: "Samarqand, O'zbekiston",
      employees: "50-80",
      rating: 4.5,
      description:
        "Innovatsion diagnostika va zamonaviy davolash uslublari bilan mashhur klinika",
      founded: 2016,
      website: "https://medlink.uz/en/clinic/nano-medical-clinic",
    },
    {
      id: 6,
      name: "MedLine Clinic",
      logo: "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?semt=ais_hybrid&w=740&q=80",
      industry: "Medical Clinic",
      location: "Buxoro, O'zbekiston",
      employees: "80-120",
      rating: 4.6,
      description:
        "Kasalliklarni aniqlash va davolashda professional tibbiy xizmatlar",
      founded: 2014,
      website: "https://medlink.uz/en/clinic/medline",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const industries = [...new Set(companies.map((c) => c.industry))];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      selectedIndustry === "all" || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    return "★".repeat(fullStars);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header & Stats */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Ish Beruvchi Kompaniyalar</h1>
          <div className="flex space-x-6">
            <div>Total Companies: <strong>{companies.length}</strong></div>
            <div>Total Industries: <strong>{industries.length}</strong></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Kompaniya yoki shaharni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Barcha sohalar</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-6">
              <div className="flex justify-between items-center mb-4">
                {company.logo.startsWith("http") ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-indigo-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg">
                    {company.logo}
                  </div>
                )}
                <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">Active</span>
              </div>

              <h2 className="text-lg font-bold mb-1">{company.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{company.industry}</p>

              <div className="text-gray-600 text-sm space-y-2 mb-4">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-500" /> {company.location}</div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-green-500" /> {company.employees} xodim</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-yellow-500" /> Tashkil etilgan: {company.founded}</div>
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> {company.rating} {getRatingStars(company.rating)}</div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{company.description}</p>

              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Batafsil
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
