import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from scipy.spatial import ConvexHull


# 8 points defining the cube corners
pts = np.array([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
                [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1],
                [0, 1, 5], [0.5, 0.5, 2]])


pts = np.array([


            [3, 0.0, -2.0],
            [-3, 0.0, -2.0],
            [2, 0.0, -2.0],
            [-2, 0.0, -2.0],
            [2.5, 0.0, -1.0],
            [-2.5, 0.0, -1.0],
            [0.5, 0.0, -1.0],
            [-0.5, 0.0, -1.0],
            [4, 0.0, 0.0],
            [-4, 0.0, 0.0],
            [1, 0.0, 0.0],
            [-1, 0.0, 0.0],
            [1, 0.0, 1.0],
            [-1, 0.0, 1.0],
            [2, 0.25, -2.0],
            [-2, 0.25, -2.0],
            [2.5, 0.25, -1.0],
            [-2.5, 0.25, -1.0],
            [-0.0, 0.75, -0.5],
            [1, 0.25, 0.0],
            [-1, 0.25, 0.0],
            [0.0, 0.75, 0.75]

])

hull = ConvexHull(pts)
triangel = []

print(hull.simplices)

fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")

# Plot defining corner points
ax.plot(pts.T[0], pts.T[1], pts.T[2], "ko")

# 12 = 2 * 6 faces are the simplices (2 simplices per square face)
for s in hull.simplices:
    s = np.append(s, s[0])  # Here we cycle back to the first coordinate
    ax.plot(pts[s, 0], pts[s, 1], pts[s, 2], "r-")

    triangel.append( [pts[s, 0], pts[s, 1], pts[s, 2]] ) 
    break

# Make axis label
for i in ["x", "y", "z"]:
    eval("ax.set_{:s}label('{:s}')".format(i, i))

plt.show()