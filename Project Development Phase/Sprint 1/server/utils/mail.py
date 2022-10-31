import smtplib
from .constants import GOOGLE_EMAIL,GOOGLE_PASSWORD

def send_otp_mail(name, email, otp):
    sent_from = "admin@tbfcp.com"
    sent_to = [email]
    sent_subject = "Otp Verification"
    sent_body = """\
        Hello %s,\n 
        Your OTP for TBFCP is %s
        Regards,
        TBFCP
        """ % (name, otp)

    email_text = """\
    From: %s
    To: %s
    Subject: %s

    %s
    """ % (sent_from, ", ".join(sent_to), sent_subject, sent_body)

    # =============================================================================
    # SEND EMAIL OR DIE TRYING!!!
    # =============================================================================

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(GOOGLE_EMAIL, GOOGLE_PASSWORD)
        server.sendmail(sent_from, sent_to, email_text)
        server.close()

        print('Email sent!')
    except Exception as exception:
        print("Error: %s!\n\n" % exception)
