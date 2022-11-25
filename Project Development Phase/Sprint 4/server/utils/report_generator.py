from fpdf import FPDF
import os


class PDF(FPDF):
    LOGO_PATH = os.path.join(os.getcwd(), "static/logo_fcp.png")

    def header(self):
        # Rendering logo:
        self.image(PDF.LOGO_PATH, 10, 8, 40)
        # Setting font: helvetica bold 15
        self.set_font("Arial", "B", 15)
        self.set_xy(82, 23)
        self.cell(45, 10, "Prediction Report", border=0, align="C")
        # Performing a line break:

    def footer(self):
        # Position cursor at 1.5 cm from bottom:
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")
        self.set_xy(10, -17)
        self.cell(190, 0.4, '', border=1, fill=1)
        self.set_xy(188, -15)
        self.cell(0, 10, "©FCP")

    def set_header_report_detail(self, name, predictionDate):
        self.set_font("Arial", "", 12)
        self.set_xy(160, 12)
        self.cell(45, 4, name, border=0, align="L")
        self.set_xy(160, 17)
        self.cell(45, 4, predictionDate, border=0, align="L")
        pass

    def set_vehicle_details(self, vehicleNumber, mileage, distance, roadType, fuelType, averageSpeed, payloadWeight, vehicleWeight, fuelPrice):
        self.set_font_size(10)
        # name
        left_col = [
            {
                'title': 'Vehicle Number:',
                'value': vehicleNumber
            },

            {
                'title': 'Mileage (Km/l):',
                'value': mileage
            },
            {
                'title': 'Distance (Km):',
                'value': distance
            },
            {
                'title': 'Road Type',
                'value': roadType
            },
            {
                'title': 'Fuel Type:',
                'value': fuelType
            },
        ]

        right_col = [
            {
                'title': 'Average Speed (Km/hr):',
                'value': averageSpeed
            },
            {
                'title': 'Payload Weight(Tonnes):',
                'value': payloadWeight
            },
            {
                'title': 'Vehicle Weight(Tonnes):',
                'value': vehicleWeight
            },
            {
                'title': 'Today\'s fuel price (Rupees):',
                'value': fuelPrice
            },
        ]
        x = 20
        y = 40
        x_increment_factor = 30
        y_increment_factor = 10
        for field in left_col:
            x = 20
            self.set_xy(x, y)
            self.set_font("Arial", "B", 10)
            self.cell(w=20, h=4, txt=field['title'])
            self.set_xy(x + x_increment_factor, y)
            self.set_font("Arial", "", 10)
            self.cell(w=55, h=4, txt=field['value'])
            y = y + y_increment_factor

        x = 130
        y = 40
        x_increment_factor = 50
        for field in right_col:
            x = 120
            self.set_xy(x, y)
            self.set_font("Arial", "B", 10)
            self.cell(w=20, h=4, txt=field['title'])
            self.set_xy(x + x_increment_factor, y)
            self.set_font("Arial", "", 10)
            self.cell(w=55, h=4, txt=field['value'])
            y = y + y_increment_factor

    def set_scatter_plot(self, image):
        self.set_scatter_paragraph()
        self.image(image, x=20, y=140, w=170)

    def set_predicted_value(self, predictedValue='', predictedPrice=""):
        x = 70
        y = 95
        w = 34
        gap = 5
        self.set_xy(x - 3, y - 3)
        self.set_line_width(0.6)
        self.cell(w=65, h=18, border=1)
        self.set_xy(x, y)
        self.set_font("Arial", "B", 12)
        self.multi_cell(w=w, h=6, txt="Predicted Value\n(Litres)", align="R")
        self.set_xy(w + x + gap, y + 1)
        self.set_font("Arial", "B", 14)
        self.cell(w=20, h=4, txt=predictedValue, align="L")
        self.set_xy(w + x + gap, y + 8)
        self.set_font("Arial", "B", 10)
        self.cell(w=20, h=4, txt="Rs."+predictedPrice, align="L")

    def set_scatter_paragraph(self):
        x = 20
        y = 120

        text = """
            The Following Scatter plot show the relationship between distance and consumption. The X-Axis shows the distance travelled and the Y-Axis shows the Amount of fuel consumed, The green dot represents the other vehicles, and the red square represents the predicted value.
        """
        self.set_xy(x, y)
        self.set_font("Arial", "", 10)
        self.multi_cell(w=170, txt=text, border=0)

    def set_actual_value(self):
        x = 120
        y = 90
        w = 28
        gap = 5
        self.set_xy(x, y)
        self.set_font("Arial", "B", 12)
        self.multi_cell(w=w, h=6, txt="Actual Value\n(Litres)", align="R")
        self.set_xy(w + x + gap, y + 1)
        self.set_font("Arial", "B", 14)
        self.cell(w=20, h=4, txt="43.73", align="L")
        self.set_xy(w + x + gap, y + 8)
        self.set_font("Arial", "B", 10)
        self.cell(w=20, h=4, txt="Rs."+"4540.78", align="L")
