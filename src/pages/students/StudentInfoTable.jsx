import React from "react";

export default function StudentInfoTable({ student }) {
  if (!student) return <p>Ma'lumot topilmadi</p>;

  // Jadvalda chiqadigan maydonlar
  const fields = [
    { key: "full_name", label: "To‘liq ism" },
    { key: "student_id_number", label: "Talaba ID raqami" },
    { key: "university", label: "O‘quv yurti" },
    { key: "department", label: "Fakultet" },
    { key: "specialty", label: "Yo‘nalish" },
    { key: "level", label: "Kurs" },
    { key: "group", label: "Guruh" },
    { key: "education_type", label: "Ta’lim turi" },
    { key: "education_form", label: "Ta’lim shakli" },
    { key: "payment_form", label: "To‘lov turi" },
    { key: "student_type", label: "Talaba turi" },
    { key: "social_category", label: "Ijtimoiy toifa" },
    { key: "accommodation", label: "Yotoqxona holati" },
    { key: "citizenship", label: "Fuqaroligi" },
    { key: "gender", label: "Jinsi" },
    { key: "birth_date", label: "Tug‘ilgan sana" },
    { key: "province", label: "Viloyati" },
    { key: "district", label: "Tumani" },
    { key: "current_province", label: "Hozirgi viloyati" },
    { key: "current_district", label: "Hozirgi tumani" },
    { key: "terrain", label: "Hudud" },
    { key: "current_terrain", label: "Hozirgi hudud" },
    { key: "education_year", label: "O‘quv yili" },
    { key: "year_of_enter", label: "Kirish yili" },
    { key: "avg_gpa", label: "O‘rtacha GPA" },
    { key: "avg_grade", label: "O‘rtacha baho" },
    { key: "total_credit", label: "Jami kredit" },
    { key: "is_graduate", label: "Bitiruvchi" },
    { key: "other", label: "Qo‘shimcha ma’lumot" },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        {student.image_full && (
          <img
            src={student.image_full}
            alt={student.full_name}
            className="w-28 h-28 rounded-xl object-cover border"
          />
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{student.full_name}</h2>
          <p className="text-gray-500">{student.university}</p>
        </div>
      </div>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <tbody>
          {fields.map((field, index) => (
            <tr
              key={field.key}
              className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="py-2 px-4 font-medium text-gray-700 w-1/3">
                {field.label}
              </td>
              <td className="py-2 px-4 text-gray-600">
                {String(student[field.key] ?? "-")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {student.validate_url && (
        <div className="mt-4">
          <a
            href={student.validate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Talaba ma’lumotlarini tasdiqlash havolasi
          </a>
        </div>
      )}
    </div>
  );
}
