function PersonalDataContent() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">개인정보 처리방침</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">개인정보의 처리 목적, 수집 항목, 보유 및 이용기간</h2>
        <p>
          IT지원위원회는 다음의 목적을 위하여 개인정보를 처리합니다. 아래 개인정보는 이용자가 개인정보를 직접 입력하거나
          처리방침에 안내된 방식에 따라, 개인정보 수집·이용 동의 및 회원 가입을 완료한 경우에 수집됩니다.
        </p>
        <ol className="ml-6 mt-2 list-decimal">
          <li className="mb-2">
            <strong>회원 가입 및 관리</strong>
            <br />
            처리 목적: 회원 가입 확인, 서비스 제공을 위한 본인 식별과 인증
            <br />
            필수 항목: 학번, 이름, 단과대, 학과/부
            <br />
            보유 및 이용기간: 수집한 때부터 회원 탈퇴 시까지
          </li>
          <li className="mb-2">
            <strong>자동 수집 항목</strong>
            <br />
            처리 목적: 숭실대학교 총학생회 홈페이지 서비스 품질 향상을 위한 통계 분석
            <br />
            필수 항목: 서비스 이용 과정에서 자동 생성되는 정보(자동 생성되는 임의의 식별자, 숭실대학교 총학생회 홈페이지
            앱 진입 시 서비스 방문 이력 및 접속 로그, 접속한 모바일 운영체제)
            <br />
            보유 및 이용기간: 수집한 때부터 회원 탈퇴 시까지
          </li>
        </ol>
        <p className="mt-2">
          자동 생성 정보란, 서비스 이용 과정에서 자동으로 생성되는 정보를 말합니다. 숭실대학교 총학생회 홈페이지 서비스
          이용 과정 중 임의로 부여되는 식별자, 서비스 방문 이력 및 접속 로그, 접속한 모바일 운영체제(iOS, Android)가
          생성될 수 있습니다. IT지원위원회는 수집 목적에 필요한 최소한의 자동 생성 정보만을 수집하며, 개인을 특정할 수
          있거나 개인의 권리·이익, 사생활을 뚜렷하게 침해할 우려가 있는 민감한 정보를 수집하지 않습니다. 또한 자동 생성
          정보는 암호화 및 통계 처리를 거쳐 수집 및 이용되며, 수집 목적에 따라 타 개인정보와 결합되지 않게 별도로 분리
          보관하여 개인을 특정 또는 식별하지 않도록 관리하고 있습니다.
        </p>
        <p className="mt-2">
          처리하는 개인정보는 위와 같은 목적 이외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우 「개인정보
          보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">개인정보의 제3자 제공에 관한 사항</h2>
        <p>
          IT지원위원회는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 다른 법률에 특별한 규정이
          있는 경우에는 예외로 합니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">개인정보 처리업무의 위탁에 관한 사항</h2>
        <p>
          IT지원위원회는 개인정보 처리업무를 위탁하고 있지 않습니다. 위탁업무가 발생하거나 수탁자가 변경될 경우에는
          지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">개인정보의 파기 절차 및 방법에 관한 사항</h2>
        <p>
          IT지원위원회는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당
          개인정보를 파기합니다. 개인정보 파기는 다음과 같은 절차를 통해 이루어집니다.
        </p>
        <ul className="ml-6 mt-2 list-disc">
          <li className="mb-2">
            IT지원위원회는 파기 사유가 발생한 개인정보를 선정하고, IT지원위원회의 개인정보 담당자의 승인을 받아
            개인정보를 파기합니다.
          </li>
          <li className="mb-2">
            파기 방법: 종이에 기록, 저장된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기하고, 전자적 파일 형태로
            저장된 개인정보는 기록을 재생할 수 없도록 기술적 방법을 사용하여 삭제합니다.
          </li>
        </ul>
        <p className="mt-2">
          이용자로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라
          개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스로 옮겨 관리합니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">정보주체의 권리 의무 및 행사방법에 관한 사항</h2>
        <p>
          이용자는 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 이용자는 언제든지
          ‘회원 탈퇴’ 등을 통해 개인 정보의 수집 및 이용 동의를 철회할 수 있습니다. 이용자의 권리는 하단에 안내된
          IT지원위원회 이메일을 통하여 권리를 행사하실 수 있으며 IT지원위원회는 이에 대해 지체 없이 조치하겠습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">개인정보의 안전성 확보조치에 관한 사항</h2>
        <p>IT지원위원회는 개인정보 안전성 확보 조치를 위해 다음과 같은 조치를 취하고 있습니다.</p>
        <ul className="ml-6 mt-2 list-disc">
          <li className="mb-2">관리적 조치: 내부관리계획 수립·시행</li>
          <li className="mb-2">기술적 조치: 개인정보처리시스템 등의 접근 권한 관리</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">개인정보 보호책임자에 관한 사항</h2>
        <p>
          IT지원위원회는 개인정보 보호와 관련한 이용자의 문의사항 및 불만 사항을 원활히 처리하기 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다. IT지원위원회는 이용자의 문의에 대해 지체없이 답변 및 처리해드릴
          것입니다.
        </p>
        <p className="mt-2">
          IT지원위원회
          <br />
          메일주소: <a href="mailto:ssudeveloper2024@gmail.com">ssudeveloper2024@gmail.com</a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">이용자의 권익침해에 대한 구제방법</h2>
        <p>
          이용자는 개인정보 침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원,
          개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에
          대하여는 아래의 기관에 문의하시기 바랍니다.
        </p>
        <ul className="ml-6 mt-2 list-disc">
          <li className="mb-2">
            개인정보분쟁조정위원회: (국번없이) 1833-6972 (<a href="http://www.kopico.go.kr">www.kopico.go.kr</a>)
          </li>
          <li className="mb-2">
            개인정보침해신고센터: (국번없이) 118 (<a href="http://privacy.kisa.or.kr">privacy.kisa.or.kr</a>)
          </li>
          <li className="mb-2">
            대검찰청: (국번없이) 1301 (<a href="http://www.spo.go.kr">www.spo.go.kr</a>)
          </li>
          <li className="mb-2">
            경찰청: (국번없이) 182 (<a href="http://ecrm.cyber.go.kr">ecrm.cyber.go.kr</a>)
          </li>
        </ul>
        <p className="mt-2">
          IT지원위원회는 이용자의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고
          있습니다. 신고나 상담이 필요한 경우 아래의 담당부서로 연락해주시기 바랍니다.
        </p>
        <p className="mt-2">
          개인정보보호 관련 상담 및 신고
          <br />
          IT지원위원회 메일주소: <a href="mailto:ssudeveloper2024@gmail.com">ssudeveloper2024@gmail.com</a>
        </p>
      </section>

      <p className="mt-4 text-sm text-gray-500">이 개인정보 처리방침은 2024년 10월 07일부터 적용됩니다.</p>
      <p className="text-sm text-gray-500">
        문의: <a href="mailto:ssudeveloper2024@gmail.com">ssudeveloper2024@gmail.com</a>
      </p>
    </div>
  );
}

export default PersonalDataContent;
