export default function Sidebar() {
  return (
    <aside className="h-full w-64 border-r border-gray-300 bg-gray-50">
      <div className="p-6">
        <h3 className="mb-4 text-lg font-bold text-blue-600">내 정보</h3>
        <ul>
          <li className="mb-2 cursor-pointer text-gray-700 hover:text-blue-600">작성 글 보기</li>
          <li className="cursor-pointer text-gray-700 hover:text-blue-600">서비스 공지사항</li>
        </ul>
      </div>
    </aside>
  );
}
