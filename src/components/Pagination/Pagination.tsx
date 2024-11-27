type Props = {
  totalPages: number;
  currentPage: number;
  goToPreviousPage(): void;
  goToPage(page: string | number): void;
  goToNextPage(): void;
};

const Pagination = (props: Props) => {
  const { totalPages, currentPage } = props;

  const getPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 3 && currentPage < totalPages - 1) {
        pages.push(currentPage);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };
  
  const pagination = getPagination(); 

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2">
        <button
          className={`px-4 py-2 border ${
            currentPage === 1 ? "bg-gray-200" : "bg-white hover:bg-gray-100"
          }`}
          disabled={currentPage === 1}
          onClick={props.goToPreviousPage}
        >
          Previous
        </button>

        {pagination.map((page, index) => (
          <button
            key={index}
            className={`px-4 py-2 border
              ${currentPage === page && "bg-lime-600 text-white"}
              ${page === "..." && "cursor-default"}
              ${currentPage !== page && page !== "..." && "bg-white hover:bg-gray-100"}
            `}
            disabled={page === "..."}
            onClick={() => props.goToPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-4 py-2 border ${
            currentPage === totalPages ? "bg-gray-200" : "bg-white hover:bg-gray-100"
          }`}
          disabled={currentPage === totalPages}
          onClick={props.goToNextPage}   
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
