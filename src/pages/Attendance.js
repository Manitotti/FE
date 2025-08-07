import styled from "styled-components";
import { useState, useEffect } from "react";
import CarrotImageDefault from '../assets/carrot.png';
import CarrotNotAttended from '../assets/carrotnotettend.png';

const SmallRewardBox = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 30px;
  background: #706C69;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;
  position: relative;
`;

const SmallCarrotImage = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 16px;
`;

const PageWrapper = styled.div`
  width: 1280px;
  height: 720px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 48px 0;
  font-family: "Noto Sans KR", sans-serif;
  height: 100vh;
`;

const MonthTitle = styled.h2`
  width: 325px;
  height: 59px;
  flex-shrink: 0;
  color: #FFF;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TodayRewardBox = styled.div`
  width: 403px;
  height: 403px;
  border-radius: 40px;
  background: #3C3C3C;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 40px;
`;

const DateBadge = styled.div`
  position: absolute;
  top: 14px;
  left: 24px;
  width: 48px;
  height: 39px;
  color: #FFF;
  font-family: "Noto Sans";
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CarrotImage = styled.img`
  width: 258px;
  height: 258px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  filter: ${(props) => (props.checked ? "grayscale(100%)" : "none")};
`;

const RewardInfo = styled.div`
  color: #FFF;
  font-family: "Noto Sans";
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const CheckInButton = styled.button`
  width: 158px;
  height: 60px;
  border-radius: 50px;
  background: #E06A34;
  border: none;
  cursor: pointer;
  color: #FFF;
  font-family: "Noto Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  opacity: ${(props) => (props.checked ? 0.4 : 1)};
`;

export default function AttendanceCheck() {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;

  const [checkedDate, setCheckedDate] = useState(() => {
    const saved = localStorage.getItem("checkedDate");
    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    if (checkedDate !== null) {
      localStorage.setItem("checkedDate", checkedDate);
    }
  }, [checkedDate]);

  const isTodayChecked =  checkedDate === date;

  const relativeDays = [-2, -1, 0, 1, 2].map(offset => {
    const dayDate = new Date(today);
    dayDate.setDate(date + offset);
    const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

    return {
      day: dayDate.getDate(),
      amount: isWeekend ? "300캐롯" : "100캐롯",
      isToday: offset === 0,
      isChecked: dayDate.getDate() === checkedDate
    };
  });

  return (
    <PageWrapper>
      <MonthTitle>{month}월 출석보상</MonthTitle>

      <div style={{ display: "flex", gap: "24px", justifyContent: "center", alignItems: "flex-end" }}>
        {relativeDays.map((reward, index) => (
          reward.isToday ? (
            <TodayRewardBox key={index}>
              <DateBadge>{reward.day}</DateBadge>
              <CarrotImage src={CarrotNotAttended} alt="당근" checked={isTodayChecked} />
              <RewardInfo>{reward.amount}</RewardInfo>
            </TodayRewardBox>
          ) : (
            <SmallRewardBox key={index} style={{ width: "200px", height: "200px" }}>
              <DateBadge style={{ fontSize: "24px", top: "12px", left: "16px" }}>{reward.day}</DateBadge>
              <SmallCarrotImage src={CarrotNotAttended} alt="작은 당근" style={{ width: "100px", height: "100px", filter: reward.isChecked ? "grayscale(100%)" : "none" }} />
              <RewardInfo style={{ fontSize: "24px" }}>{reward.amount}</RewardInfo>
            </SmallRewardBox>
          )
        ))}
      </div>

      <CheckInButton checked={isTodayChecked} onClick={() => setCheckedDate(date)}>
        {isTodayChecked ? "출석 완료" : "출석 체크"}
      </CheckInButton>
    </PageWrapper>
  );
}

