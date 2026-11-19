
from flask import Flask, render_template, request

app = Flask(__name__)

# Harga tur per jam untuk satu grup
PRICE_PER_HOUR = 150000


@app.route("/", methods=["GET", "POST"])
def home():
    result = None
    error = None

    # Nilai awal formulir
    form_data = {
        "tour": "",
        "hours": "2",
        "guests": "1",
        "date": ""
    }

    # Memeriksa apakah formulir dikirim
    if request.method == "POST":

        # Mengambil data dari formulir
        form_data = {
            "tour": request.form.get("tour", "").strip(),
            "hours": request.form.get("hours", ""),
            "guests": request.form.get("guests", ""),
            "date": request.form.get("date", "")
        }

        # Memeriksa input pengunjung
        if not form_data["tour"] or not form_data["date"]:
            error = "Please complete all required fields."

        else:
            try:
                hours = int(form_data["hours"])
                guests = int(form_data["guests"])

                if hours not in [2, 3, 4]:
                    error = "Please select a valid tour duration."

                elif guests not in [1, 2, 3, 4]:
                    error = "Please select between 1 and 4 guests."

                else:
                    result = hours * PRICE_PER_HOUR

            except ValueError:
                error = "Please enter valid form information."

    return render_template(
        "index.html",
        result=result,
        error=error,
        form_data=form_data
    )


if __name__ == "__main__":
    app.run(debug=True)