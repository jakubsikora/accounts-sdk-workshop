export const formatNotification = (content, variant = "success") => {
  return {
    type: "toast",
    autoHideDelayTime: 5000,
    payload: {
      variant,
      content,
      removable: true,
      horizontalPosition: "center",
      verticalPosition: "top",
      // action: {
      //   label: 'Action',
      //   handler: () => {
      //     console.log('action');
      //   },
      //   closeOnClick: true
      // }
    },
  };
};
