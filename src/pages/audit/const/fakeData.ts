export const fakeData: Array<any> = [];

for (let i = 1; i <= 20; i++) {
  fakeData.push({
    id: i.toString(),
    imgUrl: `https://via.placeholder.com/150`,
    title: `${i}번째 게시글`,
    subTitle: `${i}번째 게시글 내용입니다.`,
    date: `2023-08-${String(21 - i).padStart(2, '0')}`,
    badgeType: i === 1 ? 'New' : 'Default',
    profileImg: `https://via.placeholder.com/50`,
    profileName: `User ${i}`,
  });
}
