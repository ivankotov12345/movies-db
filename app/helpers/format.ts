export const transformVoteCount = (voteCount: number) => {
    const million = 1000000;
    const thousand = 1000;
    if(voteCount >= million) {
      return (voteCount / million) % 1 === 0
        ? (voteCount / million) + 'M'
        : (voteCount / million).toFixed(1) + 'M';
    } else if(voteCount >= thousand) {
        return (voteCount / thousand) % 1 === 0
          ? (voteCount / thousand) + 'K'
          : (voteCount / thousand).toFixed(1) + 'K';
    } else {
      return voteCount.toString();
    }
  };