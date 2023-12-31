import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useTonConnect from "../../hooks/contract/useTonConnect";
import { addressState } from "../../lib/atom/address";
import Header from "../../components/common/Header";
import MainMyAssetInfo from "../../components/main/MainMyAssetInfo";
import MainNftView from "../../components/main/NFTView/MainNftView";

const tele = (window as any).Telegram.WebApp;

const Main = () => {
  const { address } = useTonConnect();
  const [, setTonAddress] = useRecoilState(addressState);

  useEffect(() => {
    if (address) {
      setTonAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (tele) {
      tele.ready();
      tele.BackButton.hide();
    }
  }, []);

  return (
    <MainWrapper>
      <Header isOpen={false} text="NEXTON" backgroundType={false} />
      <MainMyAssetInfo />
      <MainBorder />
      <MainNftView />
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;

  background-color: #fff;
`;

export const MainBorder = styled.div`
  width: 100%;
  height: 1rem;

  background-color: #f1f4f4;
`;
