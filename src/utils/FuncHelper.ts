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

export const getFirstLetter = (name: string | undefined) => {
  if (name !== undefined && name !== "") {
    let separatedName = name.split(" ");
    let firstLetter = separatedName[0].charAt(0);

    let abb = firstLetter;
    return abb.toUpperCase();
  }
};
