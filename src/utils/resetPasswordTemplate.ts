export default (userName: string, email: string, link: string) => {
    return`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>Reset password</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            * {
              box-sizing: border-box;
              font-family: 'Inter', sans-serif;
            }
        
            h1, p {
              margin: 0;
            }
        
            a {
              text-decoration: none;
            }
        
            @media screen and (max-width: 768px) {
              h1 {
                font-size: 28px;
              }
        
              .wrapper {
                padding: 0 !important;
              }
        
              .black-wrapper {
                padding: 35px 25px !important;
              }
        
              .white-wrapper {
                padding: 25px;
              }
            }
          </style>
        </head>
        <body>
        <div class="wrapper" style="display: flex; justify-content: center; align-items: center; padding: 20px 40px; background-color: #F1EFE9;">
          <div class="black-wrapper" style="margin: 0 auto; padding: 40px; max-width: 648px; border-radius: 10px; background-color: #1A1C1E;">
            <svg style="display: block; margin-bottom: 32px;" width="187" height="50" viewBox="0 0 187 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <rect width="187" height="50" fill="url(#pattern0)"/>
              <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlink:href="#image0_1168_80836" transform="translate(-0.0748663) scale(0.00297089 0.0111111)"/>
                </pattern>
                <image id="image0_1168_80836" width="387" height="90" xlink:href="data:image/png;base64,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"/>
              </defs>
            </svg>
            <div class="white-wrapper" style="margin-bottom: 32px; padding: 40px; border-radius: 8px; background-color: #fff;">
              <h1 style="margin-bottom: 24px; font-size: 32px; font-weight: 700; color: #04070E;">Reset your account password</h1>
              <p style="margin-bottom: 24px; color: #6C7278;">
                Hi ${userName},
                <br/><br/>
                We received a request to reset the password for the ALTS Account associated with
                <br/><br/>
                <span style="color: #2364FC;">${email}</span>
              </p>
              <a href="${link}" style="display: block; margin-bottom: 24px; padding: 16px 0; width: 100%; max-width: 250px; height: 50px; border-radius: 4px; color: #fff !important; font-size: 14px; text-align: center; font-weight: 600; text-decoration: none; background-color: #27A376; cursor: pointer;">Reset your password</a>
              <p style="margin-bottom: 24px; color: #6C7278;">
                If you didn’t request to reset your password,
                <a href="" style="color: #27A376;">contact us via our support site.</a>
                No changes have been made to your account yet.
                <br/><br/>
                Having trouble signing in? Get help at ALTS Support.
                <br/><br/>
                Best Regard,
                <br/>
                ALTS Team
              </p>
              <p style="padding: 16px; border-radius: 10px; color: #6C7278; background-color: #EDF1F3;">
                ALTS Corp, 354 Oyster Point Blvd, South San Franscisco, CA 102930
              </p>
            </div>
            <p style="font-size: 12px; color: #fff;">
              This message was sent to name@doamin.com. If you don't want to receive these emails
              <br/>
              from ATLS CORP in the future, you can <b>edit your profile</b> or <b>unsubscribe</b>.
            </p>
          </div>
        </div>
        </body>
        </html>
    `;
}
