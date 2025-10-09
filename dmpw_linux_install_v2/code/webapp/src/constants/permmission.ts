export const $permissions = {
  ALL_DASHBOARD: 'dashBoard:*',
  VIEW_DASHBOARD: 'dashBoard.viewDashBoard',

  ALL_MONITORING: 'monitoring:*',
  VIEW_MONITORING: 'monitoring.viewMonitoring',

  ALL_DEVICE_MONITORING: 'deviceMonitoring:*',
  VIEW_DEVICE_MONITORING: 'deviceMonitoring.viewDeviceMonitoring',
  SEND_INSTRUCTION_DEVICE_MONITORING: 'deviceMonitoring.sendInstructionDeviceMonitoring',

  ALL_DEPARTMENT: 'department:*',
  VIEW_DEPARTMENT: 'department.viewDepartment',
  ADD_DEPARTMENT: 'department.addDepartment',
  EDIT_DEPARTMENT: 'department.editDepartment',
  DELETE_DEPARTMENT: 'department.deleteDepartment',
  VIEW_USER_DEPARTMENT: 'department.viewUserDepartment',

  ALL_USER: 'user:*',
  VIEW_USER: 'user.viewUser',
  ADD_USER: 'user.addUser',
  EDIT_USER: 'user.editUser',
  DELETE_USER: 'user.deleteUser',
  EXPORT_USER: 'user.exportUser',
  SET_WORKING_TIME_USER: 'user.setWorkingTimeUser',
  APPROVE_USER: 'user.approveUser',
  UPDATE_USER_SETTING_USER: 'user.updateUserSettingUser',

  ALL_DEVICE_SETTING: 'deviceSetting:*',
  VIEW_DEVICE_SETTING: 'deviceSetting.viewDeviceSetting',
  EDIT_DEVICE_SETTING: 'deviceSetting.editDeviceSetting',
  COPY_DEVICE_SETTING: 'deviceSetting.copyDeviceSetting',
  REINSTALL_DEVICE_SETTING: 'deviceSetting.reinstallDeviceSetting',
  VIEW_HISTORY_DEVICE_SETTING: 'deviceSetting.viewHistoryDeviceSetting',

  ALL_BUILDING: 'building:*',
  VIEW_BUILDING: 'building.viewBuilding',
  ADD_BUILDING: 'building.addBuilding',
  EDIT_BUILDING: 'building.editBuilding',
  DELETE_BUILDING: 'building.deleteBuilding',
  VIEW_MASTER_BUILDING: 'building.viewMasterBuilding',
  REGI_MASTER_BUILDING: 'building.regiMasterBuilding',

  ALL_REPORT: 'report:*',
  VIEW_REPORT: 'report.viewReport',
  VIEW_ALL_REPORT: 'report.viewAllReport',
  EXPORT_REPORT: 'report.exportReport',

  ALL_SYSTEM_LOG: 'systemLog:*',
  VIEW_SYSTEM_LOG: 'systemLog.viewSystemLog',
  EXPORT_SYSTEM_LOG: 'systemLog.exportSystemLog',

  ALL_ACCESSIBLE_DOOR: 'accessibleDoor:*',
  VIEW_ACCESSIBLE_DOOR: 'accessibleDoor.viewAccessibleDoor',
  EXPORT_ACCESSIBLE_DOOR: 'accessibleDoor.exportAccessibleDoor',

  ALL_REGISTERED_USER: 'registeredUser:*',
  VIEW_REGISTERED_USER: 'registeredUser.viewRegisteredUser',
  EXPORT_REGISTERED_USER: 'registeredUser.exportRegisteredUser',

  ALL_ACCESS_SCHEDULE: 'accessSchedule:*',
  VIEW_ACCESS_SCHEDULE: 'accessSchedule.viewAccessSchedule',
  ADD_ACCESS_SCHEDULE: 'accessSchedule.addAccessSchedule',
  EDIT_ACCESS_SCHEDULE: 'accessSchedule.editAccessSchedule',
  DELETE_ACCESS_SCHEDULE: 'accessSchedule.deleteAccessSchedule',

  ALL_DEVICE_READER: 'deviceReader:*',
  VIEW_DEVICE_READER: 'deviceReader.viewDeviceReader',
  ADD_DEVICE_READER: 'deviceReader.addDeviceReader',
  EDIT_DEVICE_READER: 'deviceReader.editDeviceReader',
  DELETE_DEVICE_READER: 'deviceReader.deleteDeviceReader',

  ALL_ACCESS_GROUP: 'accessGroup:*',
  VIEW_ACCESS_GROUP: 'accessGroup.viewAccessGroup',
  ADD_ACCESS_GROUP: 'accessGroup.addAccessGroup',
  EDIT_ACCESS_GROUP: 'accessGroup.editAccessGroup',
  DELETE_ACCESS_GROUP: 'accessGroup.deleteAccessGroup',

  ALL_HOLIDAY: 'holiday:*',
  VIEW_HOLIDAY: 'holiday.viewHoliday',
  ADD_HOLIDAY: 'holiday.addHoliday',
  EDIT_HOLIDAY: 'holiday.editHoliday',
  DELETE_HOLIDAY: 'holiday.deleteHoliday',

  ALL_ACCESS_SETTING: 'accessSetting:*',
  EDIT_ACCESS_SETTING: 'accessSetting.editAccessSetting',

  ALL_VEHICLE: 'vehicleManagement:*',
  VIEW_VEHICLE: 'vehicleManagement.viewVehicle',
  ADD_VEHICLE: 'vehicleManagement.addVehicle',
  EDIT_VEHICLE: 'vehicleManagement.editVehicle',
  DELETE_VEHICLE: 'vehicleManagement.deleteVehicle',

  ALL_VEHICLE_ALLOCATION: 'vehicleAllocation:*',
  VIEW_VEHICLE_ALLOCATION: 'vehicleAllocation.viewVehicleAllocation',
  ADD_VEHICLE_ALLOCATION: 'vehicleAllocation.addVehicleAllocation',
  EDIT_VEHICLE_ALLOCATION: 'vehicleAllocation.editVehicleAllocation',
  DELETE_VEHICLE_ALLOCATION: 'vehicleAllocation.deleteVehicleAllocation',
  RUN_VEHICLE_ALLOCATION: 'vehicleAllocation.runVehicleAllocation',

  ALL_ATTENDANCE: 'timeAttendanceReport:*',
  VIEW_ATTENDANCE: 'timeAttendanceReport.viewAttendance',
  EDIT_ATTENDANCE: 'timeAttendanceReport.editAttendance',
  EXPORT_ATTENDANCE: 'timeAttendanceReport.exportAttendance',
  VIEW_HISTORY_ATTENDANCE: 'timeAttendanceReport.viewHistoryAttendance',
  UPDATE_ATTENDANCE_SETTING_ATTENDANCE: 'timeAttendanceReport.updateAttendanceSettingAttendance',

  ALL_WORKING_TIME: 'workingTime:*',
  VIEW_WORKING_TIME: 'workingTime.viewWorkingTime',
  ADD_WORKING_TIME: 'workingTime.addWorkingTime',
  EDIT_WORKING_TIME: 'workingTime.editWorkingTime',
  DELETE_WORKING_TIME: 'workingTime.deleteWorkingTime',

  ALL_LEAVE_REQUEST: 'leaveRequest:*',
  VIEW_LEAVE_REQUEST: 'leaveRequest.viewLeaveRequest',
  ADD_LEAVE_REQUEST: 'leaveRequest.addLeaveRequest',
  EDIT_LEAVE_REQUEST: 'leaveRequest.editLeaveRequest',
  DELETE_LEAVE_REQUEST: 'leaveRequest.deleteLeaveRequest',
  VIEW_LEAVE_MANAGEMENT_LEAVE_REQUEST: 'leaveRequest.viewLeaveManagementLeaveRequest',
  MANAGE_OWN_RECORD_LEAVE_REQUEST: 'leaveRequest.manageOwnRecordLeaveRequest',

  ALL_VISIT: 'visitManagement:*',
  VIEW_VISIT: 'visitManagement.viewVisit',
  ADD_VISIT: 'visitManagement.addVisit',
  EDIT_VISIT: 'visitManagement.editVisit',
  DELETE_VISIT: 'visitManagement.deleteVisit',
  EXPORT_VISIT: 'visitManagement.exportVisit',
  VIEW_HISTORY_VISIT: 'visitManagement.viewHistoryVisit',
  APPROVE_VISIT: 'visitManagement.approveVisit',
  RETURN_CARD_VISIT: 'visitManagement.returnCardVisit',

  ALL_VISIT_REPORT: 'visitReport:*',
  VIEW_VISIT_REPORT: 'visitReport.viewVisitReport',
  EXPORT_VISIT_REPORT: 'visitReport.exportVisitReport',

  ALL_VISIT_SETTING: 'visitSetting:*',
  EDIT_VISIT_SETTING: 'visitSetting.editVisitSetting',

  BYPASS_PERMISSION: 'bypassPermission',

  ALL_ACCESS_TIME: 'timezone:*',
  VIEW_ACCESS_TIME: 'timezone.viewTimezone',
  ADD_ACCESS_TIME: 'timezone.addTimezone',
  EDIT_ACCESS_TIME: 'timezone.editTimezone',
  DELETE_ACCESS_TIME: 'timezone.deleteTimezone',

  VIEW_GUESTS: 'guests.viewGuests',

  VIEW_APPROVERS: 'approvers.viewApprovers',

  VIEW_WORK_SHIFT: 'workShift.viewWorkShift',
  ADD_WORK_SHIFT: 'workShift.addWorkShift',
  EDIT_WORK_SHIFT: 'workShift.editWorkShift',
  DELETE_WORK_SHIFT: 'workShift.deleteWorkShift',

  VIEW_SETTING: 'setting.viewSetting',
  EDIT_SETTING: 'setting.editSetting',
};
