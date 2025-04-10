import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./../../scss/wallet.scss";
import { MenuItem, Radio, Select } from "@mui/material";
import InputField from "../../components/form/InputField";
import { useFormik } from "formik";
import { CardDetailsValidation } from "../../validations/PaymentValidation";
import { ToasterAlert } from "../../utils/ToasterAlert";
import axiosInstance from "../../config/AxiosConfig";

import { IUserAccount } from "../../interfaces/IUserAccount";
import {
  formatCurrency,
  formatDate,
  formatTransactionId,
} from "../../utils/FuncHelper";
import { ITransaction } from "../../interfaces/ITransactions";
import StatusWidget from "../../components/widgets/StatusWidget";

const Wallet = () => {
  useEffect(() => {
    handleGetUserProfile();
    handleGetUserTranssctions();
  }, []);

  const [userProfileData, setUserProfileData] = React.useState(null);
  const [userAccountData, setUserAccountData] = React.useState<IUserAccount>();

  const [userTransactionData, setUserTransactionData] = React.useState<
    ITransaction[]
  >([]);

  const [openPaymentOption, setOpenPaymentOption] = React.useState(false);
  const handleOpenPaymentOption = () => setOpenPaymentOption(true);
  const handleClosePaymentOption = () => setOpenPaymentOption(false);

  const [openPaymentDetails, setOpenPaymentDetails] = React.useState(false);
  const handleOpenPaymentDetails = () => setOpenPaymentDetails(true);
  const handleClosePaymentDetails = () => setOpenPaymentDetails(false);

  const handleOnContinuePaymentOption = () => {
    if (selectedRadioValue === "") {
      ToasterAlert("Select payment option", "error");
    }

    if (selectedRadioValue === "card") {
      handleClosePaymentOption();
      handleOpenPaymentDetails();
    } else {
      ToasterAlert("Not Part of the interview test", "error");
    }
  };

  const handlePaymentCompleted = () => {
    handleClosePaymentOption();
    handleClosePaymentDetails();

    ToasterAlert("Payment completed successfully", "success");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "15px",
  };

  const [selectedRadioValue, setSelectedRadioValue] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue(event.target.value);
  };

  const handleOnBodyClick = (type: string) => {
    setSelectedRadioValue(type);
  };

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: { cardDetail: "", cvv: "", expiryDate: "" },
    validationSchema: CardDetailsValidation,
    onSubmit: () => initRequest(),
  });

  const initRequest = () => {};

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFieldValue(name, value);
  };

  const handleGetUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/user/profile");
      setIsLoading(false);

      if (response.data.status) {
        setUserProfileData(response.data.result.user);
        setUserAccountData(response.data.result.account);
      }
    } catch (error: any) {
      setIsLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const handleGetUserTranssctions = async () => {
    try {
      const response = await axiosInstance.get("/transactions/user");

      if (response.data.status) {
        setUserTransactionData(response.data.result.data);
      }
    } catch (error: any) {
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const [fundWalletPayload, setFundWalletPayload] = React.useState({
    amount: "",
  });

  const [openFundWallet, setOpenFundWallet] = React.useState(false);
  const handleOpenFundWallet = () => setOpenFundWallet(true);
  const handleCloseFundWallet = () => setOpenFundWallet(false);
  const [isFundWalletLoading, setIsFundWalletLoading] = useState(false);

  const handleSubmitFundWallet = async () => {
    try {
      if (fundWalletPayload.amount === "") {
        ToasterAlert("Enter amount", "error");
        return;
      }

      let payload = {
        amount: parseFloat(fundWalletPayload.amount),
      };

      setIsFundWalletLoading(true);
      const response = await axiosInstance.post(
        "/transactions/deposit",
        payload
      );
      setIsFundWalletLoading(false);

      if (response.data.status) {
        handleCloseFundWallet();
        setUserProfileData(response.data.result.user);
        setUserAccountData(response.data.result.account);
        handleGetUserProfile();
        handleGetUserTranssctions();
        setFundWalletPayload({ amount: "" });
      }
    } catch (error: any) {
      setIsFundWalletLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const handleChangeFundWallet = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFundWalletPayload({ amount: event.target.value });
  };

  const [transferPayload, setTransferPayload] = React.useState({
    amount: "",
    email: "",
    note: "",
  });

  const [openTransferModal, setOpenTransferModal] = React.useState(false);
  const handleOpenTransferModal = () => setOpenTransferModal(true);
  const handleCloseTransferModal = () => setOpenTransferModal(false);
  const [isTransferLoading, setIsTransferLoading] = useState(false);

  const handleSubmitTransfer = async () => {
    try {
      if (transferPayload.amount === "" && transferPayload.email === "") {
        ToasterAlert("Fill in the required fields", "error");
        return;
      }

      let payload = {
        amount: parseFloat(transferPayload.amount),
        email: transferPayload.email,
        note: transferPayload.note,
      };

      setIsTransferLoading(true);
      const response = await axiosInstance.post(
        "/transactions/transfer-email",
        payload
      );
      setIsTransferLoading(false);

      if (response.data.status) {
        handleCloseTransferModal();
        setUserProfileData(response.data.result.user);
        setUserAccountData(response.data.result.account);
        handleGetUserProfile();
        handleGetUserTranssctions();
        setTransferPayload({ amount: "", email: "", note: "" });
      }
    } catch (error: any) {
      setIsTransferLoading(false);
      ToasterAlert(error.response.data.message, "error");
    }
  };

  const handleChangeTransfer = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (event.target.name) {
      case "email":
        setTransferPayload((prevPayload) => ({
          ...prevPayload,
          email: event.target.value,
        }));

        break;

      case "amount":
        setTransferPayload((prevPayload) => ({
          ...prevPayload,
          amount: event.target.value,
        }));

        break;

      case "note":
        setTransferPayload((prevPayload) => ({
          ...prevPayload,
          note: event.target.value,
        }));

        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container-fluid wallet-wrapper">
        <h4 className="wallet-title">Wallet</h4>

        <div className="wallet-hr-line"></div>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 balance-wrapper">
            <div className="inner-balance-wrapper">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="balance-text">Actual Balance</h5>
                </div>
                <div>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.90625 6.25V18.75C3.90625 19.1644 4.07087 19.5618 4.3639 19.8549C4.65692 20.1479 5.05435 20.3125 5.46875 20.3125H21.0938C21.301 20.3125 21.4997 20.2302 21.6462 20.0837C21.7927 19.9372 21.875 19.7385 21.875 19.5312V8.59375C21.875 8.38655 21.7927 8.18784 21.6462 8.04132C21.4997 7.89481 21.301 7.8125 21.0938 7.8125H5.46875C5.05435 7.8125 4.65692 7.64788 4.3639 7.35485C4.07087 7.06183 3.90625 6.6644 3.90625 6.25ZM3.90625 6.25C3.90625 5.8356 4.07087 5.43817 4.3639 5.14515C4.65692 4.85212 5.05435 4.6875 5.46875 4.6875H18.75"
                      stroke="black"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5781 14.8438C18.0096 14.8438 18.3594 14.494 18.3594 14.0625C18.3594 13.631 18.0096 13.2812 17.5781 13.2812C17.1467 13.2812 16.7969 13.631 16.7969 14.0625C16.7969 14.494 17.1467 14.8438 17.5781 14.8438Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>

              <div className="inner-wallet-line"></div>

              <h4 className="balance-amount">
                ₦ {formatCurrency(userAccountData?.balance)}
              </h4>

              <div className="inner-wallet-line"></div>

              <div className="wallet-bank-account-wrapper">
                <div className="bank-icon-wrapper">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.6875 6.75H16.3125L9 2.25L1.6875 6.75Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.9375 6.75V12.375"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.3125 6.75V12.375"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.6875 6.75V12.375"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.0625 6.75V12.375"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.25 12.375H15.75"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.125 14.625H16.875"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <p>Wema Bank 010 210 2020</p>
                </div>

                <div className="copy-icon-wrapper">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4688 12.375V2.53125H5.625"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.6562 5.34375H2.8125V15.1875H12.6562V5.34375Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="inner-wallet-dotted-line"></div>

              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="balance-text">Pending Amount</h5>
                </div>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#0D0D0C"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="inner-wallet-line"></div>

              <h4 className="balance-amount">₦{formatCurrency(0)}</h4>
            </div>

            <div className="transaction-wrapper d-flex">
              <div className="flex-fill">
                <button onClick={handleOpenFundWallet} className="trans-btn">
                  Fund Wallet
                </button>
              </div>

              <div className="flex-fill">
                <button onClick={handleOpenTransferModal} className="trans-btn">
                  Transfer To User
                </button>
              </div>

              <div className="flex-fill">
                <button onClick={handleOpenPaymentOption} className="trans-btn">
                  Add Funds
                </button>
              </div>

              <div className="flex-fill">
                <button className="trans-btn">Withdrawal</button>
              </div>
            </div>

            <div className="transaction-wrapper d-flex">
              <div className="flex-fill">
                <button className="trans-btn">PND Amount</button>
              </div>
              <div className="flex-fill">
                <button className="trans-btn">Place Lien</button>
              </div>
              <div className="flex-fill">
                <button className="trans-btn">Freeze Wallet</button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-8 col-xl-8">
            <div className="transaction-wrapper">
              <h5 className="transaction-history-text">Transaction History</h5>

              <div className="transaction-btn-action-wrapper">
                <div className="btn-wrapper d-flex">
                  <div className="flex-fill">
                    <button>3 Years</button>
                  </div>
                  <div className="flex-fill">
                    <button>Approved</button>
                  </div>
                  <div className="flex-fill">
                    <button>Pending</button>
                  </div>

                  <div className="flex-fill">
                    <button>History</button>
                  </div>
                </div>

                <div>
                  <div className="filter-wrapper">
                    <h6>Filter By</h6>

                    <div>
                      <Select
                        className="select-filter"
                        value={"Spot"}
                        label="Spot"
                      >
                        <MenuItem value={10}>Spot</MenuItem>
                        <MenuItem value={20}>Spot 1</MenuItem>
                        <MenuItem value={30}>Spot 2</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-wrapper">
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-transaction-header">
                        Transaction ID
                      </TableCell>
                      <TableCell className="table-transaction-header">
                        Transaction Type
                      </TableCell>
                      <TableCell className="table-transaction-header">
                        Amount (₦)
                      </TableCell>
                      <TableCell className="table-transaction-header">
                        Status
                      </TableCell>
                      <TableCell className="table-transaction-header">
                        Date
                      </TableCell>
                      <TableCell className="table-transaction-header">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userTransactionData.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className="table-trans-cell"
                          component="th"
                          scope="row"
                        >
                          {formatTransactionId(row.id)}
                        </TableCell>
                        <TableCell className="table-trans-cell">
                          {row.type}
                        </TableCell>
                        <TableCell className="table-trans-cell">
                          ₦ {formatCurrency(row?.amount)}
                        </TableCell>
                        <TableCell className="table-trans-cell">
                          <StatusWidget status={row.status} />
                        </TableCell>
                        <TableCell className="table-trans-cell">
                          {formatDate(row.timestamp)}
                        </TableCell>
                        <TableCell className="table-trans-cell">
                          <button className="table-btn">View</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

        {/* PayMent Option Modal */}
        <Modal
          open={openPaymentOption}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="payment-option-top-wrapper">
              <div>
                <h6 className="title-text">Payment Option</h6>
              </div>
              <div>
                <svg
                  onClick={handleClosePaymentOption}
                  className="svg-close-option"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33317 15.8333L4.1665 14.6667L8.83317 9.99999L4.1665 5.33332L5.33317 4.16666L9.99984 8.83332L14.6665 4.16666L15.8332 5.33332L11.1665 9.99999L15.8332 14.6667L14.6665 15.8333L9.99984 11.1667L5.33317 15.8333Z"
                    fill="#1D1B20"
                  />
                </svg>
              </div>
            </div>

            <div className="payment-option-body-wrapper">
              <div
                className="inner-option-selection"
                onClick={() => handleOnBodyClick("transfer")}
              >
                <div className="internal-section">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.4998 9.79169H2.49984C1.69984 9.79169 1.0415 9.13336 1.0415 8.33335V5.56668C1.0415 5.00001 1.43315 4.42502 1.95815 4.21669L9.45815 1.21671C9.77482 1.09171 10.2249 1.09171 10.5415 1.21671L18.0415 4.21669C18.5665 4.42502 18.9582 5.00835 18.9582 5.56668V8.33335C18.9582 9.13336 18.2998 9.79169 17.4998 9.79169ZM9.99984 2.36671C9.9665 2.36671 9.93319 2.36667 9.91652 2.375L2.42481 5.37503C2.37481 5.40003 2.2915 5.50835 2.2915 5.56668V8.33335C2.2915 8.45002 2.38317 8.54169 2.49984 8.54169H17.4998C17.6165 8.54169 17.7082 8.45002 17.7082 8.33335V5.56668C17.7082 5.50835 17.6332 5.40003 17.5749 5.37503L10.0749 2.375C10.0582 2.36667 10.0332 2.36671 9.99984 2.36671Z"
                      fill="#101840"
                    />
                    <path
                      d="M18.3332 18.9583H1.6665C1.32484 18.9583 1.0415 18.675 1.0415 18.3333V15.8333C1.0415 15.0333 1.69984 14.375 2.49984 14.375H17.4998C18.2998 14.375 18.9582 15.0333 18.9582 15.8333V18.3333C18.9582 18.675 18.6748 18.9583 18.3332 18.9583ZM2.2915 17.7083H17.7082V15.8333C17.7082 15.7167 17.6165 15.625 17.4998 15.625H2.49984C2.38317 15.625 2.2915 15.7167 2.2915 15.8333V17.7083Z"
                      fill="#101840"
                    />
                    <path
                      d="M3.3335 15.625C2.99183 15.625 2.7085 15.3417 2.7085 15V9.16666C2.7085 8.82499 2.99183 8.54166 3.3335 8.54166C3.67516 8.54166 3.9585 8.82499 3.9585 9.16666V15C3.9585 15.3417 3.67516 15.625 3.3335 15.625Z"
                      fill="#101840"
                    />
                    <path
                      d="M6.6665 15.625C6.32484 15.625 6.0415 15.3417 6.0415 15V9.16666C6.0415 8.82499 6.32484 8.54166 6.6665 8.54166C7.00817 8.54166 7.2915 8.82499 7.2915 9.16666V15C7.2915 15.3417 7.00817 15.625 6.6665 15.625Z"
                      fill="#101840"
                    />
                    <path
                      d="M10 15.625C9.65833 15.625 9.375 15.3417 9.375 15V9.16666C9.375 8.82499 9.65833 8.54166 10 8.54166C10.3417 8.54166 10.625 8.82499 10.625 9.16666V15C10.625 15.3417 10.3417 15.625 10 15.625Z"
                      fill="#101840"
                    />
                    <path
                      d="M13.3335 15.625C12.9918 15.625 12.7085 15.3417 12.7085 15V9.16666C12.7085 8.82499 12.9918 8.54166 13.3335 8.54166C13.6752 8.54166 13.9585 8.82499 13.9585 9.16666V15C13.9585 15.3417 13.6752 15.625 13.3335 15.625Z"
                      fill="#101840"
                    />
                    <path
                      d="M16.6665 15.625C16.3248 15.625 16.0415 15.3417 16.0415 15V9.16666C16.0415 8.82499 16.3248 8.54166 16.6665 8.54166C17.0082 8.54166 17.2915 8.82499 17.2915 9.16666V15C17.2915 15.3417 17.0082 15.625 16.6665 15.625Z"
                      fill="#101840"
                    />
                    <path
                      d="M19.1668 18.9583H0.833496C0.491829 18.9583 0.208496 18.675 0.208496 18.3333C0.208496 17.9917 0.491829 17.7083 0.833496 17.7083H19.1668C19.5085 17.7083 19.7918 17.9917 19.7918 18.3333C19.7918 18.675 19.5085 18.9583 19.1668 18.9583Z"
                      fill="#101840"
                    />
                    <path
                      d="M10 7.70834C8.96667 7.70834 8.125 6.86668 8.125 5.83334C8.125 4.80001 8.96667 3.95834 10 3.95834C11.0333 3.95834 11.875 4.80001 11.875 5.83334C11.875 6.86668 11.0333 7.70834 10 7.70834ZM10 5.20834C9.65833 5.20834 9.375 5.49168 9.375 5.83334C9.375 6.17501 9.65833 6.45834 10 6.45834C10.3417 6.45834 10.625 6.17501 10.625 5.83334C10.625 5.49168 10.3417 5.20834 10 5.20834Z"
                      fill="#101840"
                    />
                  </svg>
                  <h6>Bank Transfer</h6>
                </div>

                <div>
                  <Radio
                    checked={selectedRadioValue === "transfer"}
                    onChange={handleRadioChange}
                    value="transfer"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    color="secondary"
                  />
                </div>
              </div>

              <div
                className="inner-option-selection"
                onClick={() => handleOnBodyClick("card")}
              >
                <div className="internal-section">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3332 7.70834H1.6665C1.32484 7.70834 1.0415 7.42501 1.0415 7.08334C1.0415 6.74168 1.32484 6.45834 1.6665 6.45834H18.3332C18.6748 6.45834 18.9582 6.74168 18.9582 7.08334C18.9582 7.42501 18.6748 7.70834 18.3332 7.70834Z"
                      fill="#101840"
                    />
                    <path
                      d="M6.66667 14.375H5C4.65833 14.375 4.375 14.0917 4.375 13.75C4.375 13.4083 4.65833 13.125 5 13.125H6.66667C7.00833 13.125 7.29167 13.4083 7.29167 13.75C7.29167 14.0917 7.00833 14.375 6.66667 14.375Z"
                      fill="#101840"
                    />
                    <path
                      d="M12.0833 14.375H8.75C8.40833 14.375 8.125 14.0917 8.125 13.75C8.125 13.4083 8.40833 13.125 8.75 13.125H12.0833C12.425 13.125 12.7083 13.4083 12.7083 13.75C12.7083 14.0917 12.425 14.375 12.0833 14.375Z"
                      fill="#101840"
                    />
                    <path
                      d="M14.6332 17.7083H5.3665C2.04984 17.7083 1.0415 16.7083 1.0415 13.425V6.57499C1.0415 3.29166 2.04984 2.29166 5.3665 2.29166H14.6248C17.9415 2.29166 18.9498 3.29166 18.9498 6.57499V13.4167C18.9582 16.7083 17.9498 17.7083 14.6332 17.7083ZM5.3665 3.54166C2.74984 3.54166 2.2915 3.99166 2.2915 6.57499V13.4167C2.2915 16 2.74984 16.45 5.3665 16.45H14.6248C17.2415 16.45 17.6998 16 17.6998 13.4167V6.57499C17.6998 3.99166 17.2415 3.54166 14.6248 3.54166H5.3665Z"
                      fill="#101840"
                    />
                  </svg>

                  <h6>Add Debit/Creit Card</h6>
                </div>

                <div>
                  <Radio
                    checked={selectedRadioValue === "card"}
                    onChange={handleRadioChange}
                    value="card"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                    color="secondary"
                  />
                </div>
              </div>

              <div className="add-payment-wrapper">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6795 18.9584C5.73786 18.9584 1.72119 14.9417 1.72119 10C1.72119 5.05835 5.73786 1.04169 10.6795 1.04169C15.6212 1.04169 19.6379 5.05835 19.6379 10C19.6379 14.9417 15.6212 18.9584 10.6795 18.9584ZM10.6795 2.29169C6.42952 2.29169 2.97119 5.75002 2.97119 10C2.97119 14.25 6.42952 17.7084 10.6795 17.7084C14.9295 17.7084 18.3879 14.25 18.3879 10C18.3879 5.75002 14.9295 2.29169 10.6795 2.29169Z"
                    fill="#101840"
                  />
                  <path
                    d="M14.0129 10.625H7.34619C7.00452 10.625 6.72119 10.3417 6.72119 10C6.72119 9.65833 7.00452 9.375 7.34619 9.375H14.0129C14.3545 9.375 14.6379 9.65833 14.6379 10C14.6379 10.3417 14.3545 10.625 14.0129 10.625Z"
                    fill="#101840"
                  />
                  <path
                    d="M10.6797 13.9584C10.338 13.9584 10.0547 13.675 10.0547 13.3334V6.66669C10.0547 6.32502 10.338 6.04169 10.6797 6.04169C11.0214 6.04169 11.3047 6.32502 11.3047 6.66669V13.3334C11.3047 13.675 11.0214 13.9584 10.6797 13.9584Z"
                    fill="#101840"
                  />
                </svg>
                <h6>Add Payment Method</h6>
              </div>
            </div>

            <div className="continue-btn-wrapper">
              <button onClick={handleOnContinuePaymentOption}>Continue</button>
            </div>
          </Box>
        </Modal>

        {/* PayMent Details Modal */}
        <Modal
          open={openPaymentDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="payment-option-top-wrapper">
              <div>
                <h6 className="title-text">Payment Details</h6>
              </div>

              <div>
                <svg
                  onClick={handleClosePaymentDetails}
                  className="svg-close-option"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33317 15.8333L4.1665 14.6667L8.83317 9.99999L4.1665 5.33332L5.33317 4.16666L9.99984 8.83332L14.6665 4.16666L15.8332 5.33332L11.1665 9.99999L15.8332 14.6667L14.6665 15.8333L9.99984 11.1667L5.33317 15.8333Z"
                    fill="#1D1B20"
                  />
                </svg>
              </div>
            </div>

            <div className="payment-details-body-wrapper">
              <div className="inner-details-selection">
                <InputField
                  section="payment"
                  type="text"
                  label="Card details"
                  value={values.cardDetail}
                  name="cardDetail"
                  error={Boolean(errors.cardDetail)}
                  errorText={errors.cardDetail}
                  onChange={handleChange}
                  placeholder="card detail"
                />
              </div>

              <div className="inner-option-selection">
                <InputField
                  section="null"
                  type="text"
                  label="Expiry Date"
                  value={values.expiryDate}
                  name="expiryDate"
                  error={Boolean(errors.expiryDate)}
                  errorText={errors.expiryDate}
                  onChange={handleChange}
                  placeholder="DD/MM/YY"
                />
              </div>

              <div className="inner-option-selection">
                <InputField
                  section="auth"
                  type="text"
                  label="CVV"
                  value={values.cvv}
                  name="cvv"
                  error={Boolean(errors.cvv)}
                  errorText={errors.cvv}
                  onChange={handleChange}
                  placeholder="456"
                />
              </div>
            </div>

            <div className="continue-btn-wrapper">
              <button onClick={handlePaymentCompleted}>Pay Now</button>
            </div>
          </Box>
        </Modal>

        {/* Fund Wallet Modal */}
        <Modal
          open={openFundWallet}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="payment-option-top-wrapper">
              <div>
                <h6 className="title-text">Fund Wallet</h6>
              </div>

              <div>
                <svg
                  onClick={handleCloseFundWallet}
                  className="svg-close-option"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33317 15.8333L4.1665 14.6667L8.83317 9.99999L4.1665 5.33332L5.33317 4.16666L9.99984 8.83332L14.6665 4.16666L15.8332 5.33332L11.1665 9.99999L15.8332 14.6667L14.6665 15.8333L9.99984 11.1667L5.33317 15.8333Z"
                    fill="#1D1B20"
                  />
                </svg>
              </div>
            </div>

            <div className="payment-details-body-wrapper">
              <div className="inner-details-selection">
                <InputField
                  section="null"
                  type="text"
                  label="Amount"
                  value={fundWalletPayload.amount}
                  name="amount"
                  error={Boolean(fundWalletPayload.amount)}
                  errorText={
                    Boolean(fundWalletPayload.amount) ? "" : "Enter amounr"
                  }
                  onChange={handleChangeFundWallet}
                  placeholder="amount"
                />
              </div>
            </div>

            <div className="continue-btn-wrapper">
              <button
                disabled={isFundWalletLoading}
                onClick={handleSubmitFundWallet}
              >
                {!isFundWalletLoading ? (
                  <>
                    <span>Fund Wallet</span>
                  </>
                ) : (
                  <>
                    <span>
                      <div className="spinner-border text-light spinner-border-sm"></div>
                    </span>
                  </>
                )}
              </button>
            </div>
          </Box>
        </Modal>

        {/* Transfer with Email Modal */}
        <Modal
          open={openTransferModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="payment-option-top-wrapper">
              <div>
                <h6 className="title-text">Transfer To User</h6>
              </div>

              <div>
                <svg
                  onClick={handleCloseTransferModal}
                  className="svg-close-option"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33317 15.8333L4.1665 14.6667L8.83317 9.99999L4.1665 5.33332L5.33317 4.16666L9.99984 8.83332L14.6665 4.16666L15.8332 5.33332L11.1665 9.99999L15.8332 14.6667L14.6665 15.8333L9.99984 11.1667L5.33317 15.8333Z"
                    fill="#1D1B20"
                  />
                </svg>
              </div>
            </div>

            <div className="payment-details-body-wrapper">
              <div className="inner-details-selection">
                <InputField
                  section="null"
                  type="text"
                  label="Amount"
                  value={transferPayload.amount}
                  name="amount"
                  error={Boolean(transferPayload.amount)}
                  errorText={
                    Boolean(transferPayload.amount) ? "" : "Enter amounr"
                  }
                  onChange={handleChangeTransfer}
                  placeholder="amount"
                />
              </div>

              <div className="inner-details-selection">
                <InputField
                  section="null"
                  type="email"
                  label="Email"
                  value={transferPayload.email}
                  name="email"
                  error={Boolean(transferPayload.email)}
                  errorText={
                    Boolean(transferPayload.email) ? "" : "Enter email"
                  }
                  onChange={handleChangeTransfer}
                  placeholder="email"
                />
              </div>

              <div className="inner-details-selection">
                <InputField
                  section="null"
                  type="text"
                  label="Note"
                  value={transferPayload.note}
                  name="note"
                  error={Boolean(transferPayload.note)}
                  errorText={Boolean(transferPayload.email) ? "" : ""}
                  onChange={handleChangeTransfer}
                  placeholder="note"
                />
              </div>
            </div>

            <div className="continue-btn-wrapper">
              <button
                disabled={isTransferLoading}
                onClick={handleSubmitTransfer}
              >
                {!isTransferLoading ? (
                  <>
                    <span>Transfer to user</span>
                  </>
                ) : (
                  <>
                    <span>
                      <div className="spinner-border text-light spinner-border-sm"></div>
                    </span>
                  </>
                )}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Wallet;
