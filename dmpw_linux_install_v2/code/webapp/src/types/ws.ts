export interface IWsDeviceConnection {
  dbIdCount: number;
  deviceAddress: string;
  deviceType: string;
  doorStatus: string;
  doorStatusId: number;
  eventCount: number;
  fromDbIdNumber: number;
  inReader: string | null;
  ipAddress: string;
  lastCommunicationTime: string;
  nfcModule: string | null;
  outReader: string | null;
  status: number;
  userCount: number;
  version: string;
}

export interface IWsProcessData {
  msgId: string;
  index: number;
  total: number;
}
