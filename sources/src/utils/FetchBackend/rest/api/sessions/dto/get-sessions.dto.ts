interface GetSessionDto {
  dp_id: number;
  dp_date: string;
  dp_ip: string;
  dp_agent: string;
}

interface GetSessionsDto {
  dp_current: GetSessionDto;
  dp_other: GetSessionDto[];
}

export default GetSessionsDto;
