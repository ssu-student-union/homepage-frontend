enum Size {
  default, // 기본 사이즈
  audit, // audit 사이즈 // 다들 이거 적용해보시고 사이즈 괜찮으면 default로 교체하면 될 거 같아요.
  medium, // 중간 사이즈
  mediumSmall, // 중간보다 작은 사이즈
  small, // 제일 작은 사이즈
  view, // 세로로 길쭉한 PostCardMissing에만 이용
}

export { Size };
