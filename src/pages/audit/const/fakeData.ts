export const fakeData: Array<any> = [];

for (let i = 1; i <= 20; i++) {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - i);

  fakeData.push({
    id: i.toString(),
    imgUrl: `https://via.placeholder.com/150`,
    title: `${i}번째 게시글`,
    subTitle: `${i}번째 게시글 내용입니다.`,
    date: pastDate,
    badgeType: i === 1 ? 'New' : 'Default',
    profileImg: `https://via.placeholder.com/50`,
    profileName: `User ${i}`,
    contentText: `${i}번째 소식 : 원숭이가 나무에서 ${i}번 떨어졌어요. 대박대박대박대박대박대박대박대박대박대박대박대박대박대박대박대박대박대박대박`,
    contentImages: [`https://via.placeholder.com/450`, `https://via.placeholder.com/450`],
    orgName: `중앙감사위원회 한빛`,
    file: {
      fileName: `example_${i}.pdf`,
      fileUrl: `https://via.placeholder.com/450`,
    },
  });
}
