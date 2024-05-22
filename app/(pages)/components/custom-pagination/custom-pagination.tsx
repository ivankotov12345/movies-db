import { Pagination } from '@mantine/core';

type CustomPaginationProps = {
  totalPages: number,
  currentPage: number,
  handlePageChange: (value: number) => void

}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange
}) => (
  <Pagination
    total={totalPages}
    value={currentPage}
    color='appColors.6'
    onChange={handlePageChange}
    boundaries={0}
    getItemProps={(page) => ({
      style: {
        display: 
          (currentPage <= 2 && page > 3) || 
          (currentPage >= totalPages - 1 && page < totalPages - 2) ||
          (
            currentPage > 2
            && currentPage < totalPages - 1
            && Math.abs(currentPage - page) > 1
          ) 
          ? 'none' 
          : 'block',
      },
    })} 
  />
);
