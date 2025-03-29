import requests
import math
from shapely.geometry import Polygon

# 🔹 OpenStreetMap (OSM) Nominatim API for Free Geocoding
OSM_NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

# Default floor height assumption (in meters)
DEFAULT_FLOOR_HEIGHT = 3.5

# Function to Get Latitude & Longitude from OSM
def get_location_from_osm(place_name):
    params = {"q": place_name, "format": "json"}
    headers = {"User-Agent": "LocationFetcherScript"}  # Required by OSM

    response = requests.get(OSM_NOMINATIM_URL, params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        if data:
            lat, lon = float(data[0]["lat"]), float(data[0]["lon"])
            return lat, lon  # Store Latitude & Longitude in variables
    return None, None

# Function to generate building boundary from a single lat/lon
def generate_building_coords(lat, lon, offset=0.0002):
    """
    Generates 4 boundary points around the given latitude & longitude.
    Offset controls the size of the simulated building footprint.
    """
    return [
        (lat + offset, lon - offset),  # Top-left
        (lat + offset, lon + offset),  # Top-right
        (lat - offset, lon + offset),  # Bottom-right
        (lat - offset, lon - offset),  # Bottom-left
        (lat + offset, lon - offset)   # Closing the polygon
    ]

# Function to calculate distance between two lat/lon points (Haversine formula)
def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371000  # Radius of the Earth in meters
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2.0) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c  # Distance in meters

# Function to calculate building dimensions (Width, Length, Height)
def calculate_building_dimensions(coords, known_height=None, floors=None):
    if len(coords) < 3:
        return "Not enough coordinates to form a building outline."

    # Calculate width & length using pairwise distances
    distances = []
    for i in range(len(coords)):
        for j in range(i + 1, len(coords)):
            dist = haversine_distance(coords[i][0], coords[i][1], coords[j][0], coords[j][1])
            distances.append(dist)

    width = min(distances)  # Shortest side
    length = max(distances)  # Longest side

    # Calculate area if possible
    polygon = Polygon(coords)
    area = polygon.area * 111_139**2 if len(coords) > 2 else "Unknown"

    # Determine height
    if known_height is not None:
        height = known_height  # Use provided height
    elif floors is not None:
        height = floors * DEFAULT_FLOOR_HEIGHT  # Estimate height from floors
    else:
        height = "Unknown"

    return {
        "Width (m)": round(width, 2),
        "Length (m)": round(length, 2),
        "Height (m)": round(height, 2) if isinstance(height, (int, float)) else height,
        "Estimated Area (sqm)": round(area, 2) if isinstance(area, float) else area
    }

# 🔥 Example Usage:
location_name = input("Enter a location (e.g., 'Jwalaji Temple, Himachal Pradesh'): ")
latitude, longitude = get_location_from_osm(location_name)

if latitude is not None and longitude is not None:
    print(f"📍 Latitude: {latitude}, Longitude: {longitude}")

    # Generate building coordinates
    building_coords = generate_building_coords(latitude, longitude)

    # 🔹 Provide known height OR number of floors (Choose one)
    known_building_height = None  # If known, enter a value in meters (e.g., 50)
    estimated_floors = 10  # If height is unknown, provide number of floors

    # Run the function
    dimensions = calculate_building_dimensions(building_coords, known_building_height, estimated_floors)

    # Print Results
    print("\n🏢 Estimated Building Dimensions:")
    for key, value in dimensions.items():
        print(f"📏 {key}: {value}")
else:
    print("❌ Location not found!")
