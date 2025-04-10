export const formatCurrency = (value: number | any) => {
  if (value === undefined) {
    value = 0;
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (date: string): string => {
  let incomingDate = date.split("T");
  return incomingDate[0];
};

export const formatTransactionId = (id: number): string => {
  return "TXN000" + id;
};
