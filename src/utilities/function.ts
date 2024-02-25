const convertCaption = (account: string) => {
  return account.length > 10 ? account.slice(0, 20) + "..." : account;
};

export { convertCaption };
