import { useEffect, useState } from "react";
import api from "../../api/axios"; // 🔹 axios o‘rniga bizning interceptorli instance
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);
  const [nextPage, setNextPage] = useState(null);

  // 🔹 Filterlar uchun ma'lumotlar
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [paymentForms, setPaymentForms] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [socialCategories, setSocialCategories] = useState([]);
  const [genders, setGenders] = useState([]);

  // 🔹 Filter qiymatlar
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPaymentForm, setSelectedPaymentForm] = useState("all");
  const [selectedAccommodation, setSelectedAccommodation] = useState("all");
  const [selectedSocialCategory, setSelectedSocialCategory] = useState("all");

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const STUDENTS_API = "/students/list/";

  // 🔹 Filter endpointlardan ma'lumot olish
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [
          depRes,
          lvlRes,
          payRes,
          accRes,
          socRes,
          genderRes,
        ] = await Promise.all([
          api.get("/base/departments/"),
          api.get("/base/levels/"),
          api.get("/base/payment-forms/"),
          api.get("/base/accommodations/"),
          api.get("/base/social-categories/"),
          api.get("/base/genders/"),
        ]);

        setDepartments(depRes.data);
        setLevels(lvlRes.data);
        setPaymentForms(payRes.data);
        setAccommodations(accRes.data);
        setSocialCategories(socRes.data);
        setGenders(genderRes.data);
      } catch (err) {
        console.error("Filterlarni olishda xatolik:", err);
      }
    };
    fetchFilters();
  }, []);

  // 🔹 Talabalar ro'yxatini olish
  useEffect(() => {
    fetchStudents();
  }, [
    searchTerm,
    selectedGender,
    selectedLevel,
    selectedDepartment,
    selectedPaymentForm,
    selectedAccommodation,
    selectedSocialCategory,
    pageIndex,
  ]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm || undefined,
        gender: selectedGender !== "all" ? selectedGender : undefined,
        level: selectedLevel !== "all" ? selectedLevel : undefined,
        department: selectedDepartment !== "all" ? selectedDepartment : undefined,
        payment_form: selectedPaymentForm !== "all" ? selectedPaymentForm : undefined,
        accommodation: selectedAccommodation !== "all" ? selectedAccommodation : undefined,
        social_category: selectedSocialCategory !== "all" ? selectedSocialCategory : undefined,
        page: pageIndex + 1,
      };

      const res = await api.get(STUDENTS_API, { params });
      setStudents(res.data.results || []);
      setTotalStudents(res.data.count || (res.data.results ? res.data.results.length : 0));
      setNextPage(res.data.next);
    } catch (err) {
      console.error("Talabalarni olishda xatolik:", err);
      setStudents([]);
      setTotalStudents(0);
      setNextPage(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Jadval uchun ma'lumotlar
  const data = students.map((s) => ({
    id: s.id,
    fullName: s.full_name,
    studentId: s.student_id_number,
    department: s.department ?? "-",
    specialty: s.specialty ?? "-",
    level: s.level ?? "-",
    educationForm: `${s.education_form ?? "-"} (${s.education_type ?? "-"})`,
    paymentForm: s.payment_form ?? "-",
    gender: s.gender ?? "-",
    province: s.province ?? "-",
    currentLocation: `${s.current_province ?? "-"}, ${s.current_district ?? "-"}`,
    accommodation: s.accommodation ?? "-",
    socialCategory: s.social_category ?? "-",
    gpa: s.avg_gpa ? parseFloat(s.avg_gpa).toFixed(2) : null,
  }));

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "F.I.Sh.", accessorKey: "fullName" },
    { header: "Talaba ID", accessorKey: "studentId" },
    { header: "Fakultet", accessorKey: "department" },
    { header: "Mutahassislik", accessorKey: "specialty" },
    { header: "Kurs", accessorKey: "level" },
    { header: "To‘lov", accessorKey: "paymentForm" },
    { header: "Jinsi", accessorKey: "gender" },
    { header: "Hudud", accessorKey: "province" },
    {
      header: "GPA",
      accessorKey: "gpa",
      cell: (info) => {
        const gpa = parseFloat(info.getValue());
        if (isNaN(gpa)) return <span className="text-gray-400">-</span>;
        let color =
          gpa >= 4.5
            ? "bg-green-100 text-green-800"
            : gpa >= 4.0
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800";
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
            {gpa.toFixed(2)}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalStudents / pageSize),
    state: { pagination: { pageIndex, pageSize } },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4 space-y-6">
      {/* FILTER PANEL */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 max-w-full overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterSelect label="Jins" value={selectedGender} onChange={(val) => { setPageIndex(0); setSelectedGender(val); }} options={genders} />
          <FilterSelect label="Kurs" value={selectedLevel} onChange={(val) => { setPageIndex(0); setSelectedLevel(val); }} options={levels} />
          <FilterSelect label="Fakultet" value={selectedDepartment} onChange={(val) => { setPageIndex(0); setSelectedDepartment(val); }} options={departments} />
          <FilterSelect label="To‘lov turi" value={selectedPaymentForm} onChange={(val) => { setPageIndex(0); setSelectedPaymentForm(val); }} options={paymentForms} />
          <FilterSelect label="Yotoqxona" value={selectedAccommodation} onChange={(val) => { setPageIndex(0); setSelectedAccommodation(val); }} options={accommodations} />
          <FilterSelect label="Ijtimoiy toifa" value={selectedSocialCategory} onChange={(val) => { setPageIndex(0); setSelectedSocialCategory(val); }} options={socialCategories} />

          <div className="lg:col-span-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => { setPageIndex(0); setSearchTerm(e.target.value); }}
              placeholder="Ism, ID yoki familiya..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* TABLE va Pagination */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        {loading ? (
          <div className="py-20 flex flex-col items-center text-gray-600">
            <div className="h-10 w-10 border-t-4 border-indigo-500 border-solid rounded-full animate-spin mb-4"></div>
            Yuklanmoqda...
          </div>
        ) : students.length === 0 ? (
          <div className="py-20 text-center text-gray-600 text-lg">
            🔍 Talaba topilmadi
          </div>
        ) : (
          <table className="min-w-full border-collapse text-xs">
            <thead className="bg-indigo-600 text-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left font-semibold uppercase"
                    >
                      {header.column.columnDef.header}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`transition hover:bg-indigo-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-3 text-gray-700">
                      {cell.renderValue()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
          <button
            onClick={() => setPageIndex((p) => Math.max(p - 1, 0))}
            disabled={pageIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Oldingi
          </button>
          <span className="font-medium text-gray-700">
            Sahifa: <b>{pageIndex + 1}</b> / {Math.ceil(totalStudents / pageSize)}
          </span>
          <button
            onClick={() => nextPage && setPageIndex((p) => p + 1)}
            disabled={!nextPage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Keyingi <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// 🔹 FilterSelect komponenti
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 text-sm"
      >
        <option value="all">Barchasi</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
}
